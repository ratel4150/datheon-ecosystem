// drizzle/schema.ts
import { pgTable, text, timestamp, uuid, integer, boolean, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['student', 'mentor', 'admin']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['in_progress', 'completed']);
export const courseStatusEnum = pgEnum('course_status', ['draft', 'published']);

/** No duplicamos toda la identidad de Clerk aquí — solo lo que nuestro
 *  dominio necesita. `clerkUserId` es la referencia real a la cuenta. */
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUserId: text('clerk_user_id').notNull(),
  role: roleEnum('role').notNull().default('student'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  clerkUserIdIdx: uniqueIndex('users_clerk_user_id_idx').on(table.clerkUserId),
}));

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  /** Coincide con los ids de BUILD_OPTIONS en apps/academy
   *  (web-app, mobile-app, ai-agent, data-project, automation, experimental) */
  buildCategory: text('build_category').notNull(),
  status: courseStatusEnum('status').notNull().default('draft'),
  createdByUserId: uuid('created_by_user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex('courses_slug_idx').on(table.slug),
}));

export const courseSteps = pgTable('course_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

/** Los requisitos verificables del proyecto — lo que un mentor revisa
 *  antes de aprobar el diploma (no un quiz de opción múltiple). */
export const checklistItems = pgTable('checklist_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  label: text('label').notNull(),
  description: text('description').notNull(),
});

export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  courseId: uuid('course_id').notNull().references(() => courses.id),
  status: enrollmentStatusEnum('status').notNull().default('in_progress'),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  userCourseIdx: uniqueIndex('enrollments_user_course_idx').on(table.userId, table.courseId),
}));

export const stepProgress = pgTable('step_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  stepId: uuid('step_id').notNull().references(() => courseSteps.id),
  completedAt: timestamp('completed_at').notNull().defaultNow(),
}, (table) => ({
  enrollmentStepIdx: uniqueIndex('step_progress_enrollment_step_idx').on(table.enrollmentId, table.stepId),
}));

/** Un ítem del checklist final solo cuenta como cumplido cuando un
 *  mentor real lo aprueba — no es autoevaluación. */
export const checklistCompletions = pgTable('checklist_completions', {
  id: uuid('id').primaryKey().defaultRandom(),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  checklistItemId: uuid('checklist_item_id').notNull().references(() => checklistItems.id),
  approvedByUserId: uuid('approved_by_user_id').notNull().references(() => users.id),
  approvedAt: timestamp('approved_at').notNull().defaultNow(),
}, (table) => ({
  enrollmentItemIdx: uniqueIndex('checklist_completions_enrollment_item_idx').on(table.enrollmentId, table.checklistItemId),
}));

/** El diploma en sí — deliberadamente simple (sin verificación pública
 *  todavía, eso es una fase posterior según lo que ya hablamos). */
export const diplomas = pgTable('diplomas', {
  id: uuid('id').primaryKey().defaultRandom(),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }).unique(),
  issuedAt: timestamp('issued_at').notNull().defaultNow(),
  verificationCode: text('verification_code').notNull().unique(),
});

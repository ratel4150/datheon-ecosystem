import { Inject, Injectable } from '@nestjs/common';
import { eq, asc } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.module';
import { courses, courseSteps, checklistItems } from '../../drizzle/schema';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import type * as schema from '../../drizzle/schema';

@Injectable()
export class CoursesService {
  constructor(@Inject(DRIZZLE) private readonly db: NeonHttpDatabase<typeof schema>) {}

  async findPublished() {
    return this.db.select().from(courses).where(eq(courses.status, 'published'));
  }

  async findBySlug(slug: string) {
    const [course] = await this.db.select().from(courses).where(eq(courses.slug, slug));
    if (!course) return null;

    const steps = await this.db.select().from(courseSteps).where(eq(courseSteps.courseId, course.id)).orderBy(asc(courseSteps.order));
    const checklist = await this.db.select().from(checklistItems).where(eq(checklistItems.courseId, course.id)).orderBy(asc(checklistItems.order));

    return { ...course, steps, checklist };
  }
}

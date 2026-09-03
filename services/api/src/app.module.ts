import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [DbModule, CoursesModule],
})
export class AppModule {}

import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list() {
    return this.coursesService.findPublished();
  }

  @Get(':slug')
  async detail(@Param('slug') slug: string) {
    const course = await this.coursesService.findBySlug(slug);
    if (!course) throw new NotFoundException('Curso no encontrado.');
    return course;
  }
}

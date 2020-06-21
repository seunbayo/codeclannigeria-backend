import {
  Body,
  ConflictException,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseCrudController } from '~shared/controllers';
import { Roles } from '~shared/decorators/roles.decorator';
import { ApiException } from '~shared/errors';

import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { UserRole } from '../users/models/user.entity';
import { Course } from './models/course.entity';
import { CourseDto, PagedCourseOutputDto } from './models/dtos/course.dto';
import { CreateCourseDto } from './models/dtos/create-course.dto';

export class CoursesController extends BaseCrudController<
  Course,
  CourseDto,
  CreateCourseDto
>({
  entity: Course,
  entityDto: CourseDto,
  createDto: CreateCourseDto,
  updateDto: CreateCourseDto,
  pagedOutputDto: PagedCourseOutputDto,
  auth: {
    update: [UserRole.MENTOR, UserRole.ADMIN],
    delete: [UserRole.MENTOR, UserRole.ADMIN]
  }
}) {
  @Post()
  @ApiResponse({ type: CourseDto, status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ApiException })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  async create(@Body() input: CreateCourseDto): Promise<CourseDto> {
    const exist = await this.service.findOneAsync({ title: input.title });
    if (exist)
      throw new ConflictException('Course with the title already exists');

    return super.create(input);
  }
}
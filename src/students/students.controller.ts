import { Controller, Get, Post, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './Student';

@Controller('students')
export class StudentsController {

  constructor(private readonly students: StudentsService) { }

  @Get()
  findAll(): Student[] {
    return this.students.getStudents();
  }

  @Get(':id')
  findOne(@Param() params): Student {
    return this.students.getStudent(params.id);
  }

}

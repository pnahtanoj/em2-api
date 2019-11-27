import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student, StudentCreatePayload } from './Student';

@Controller('students')
export class StudentsController {

  constructor(private readonly students: StudentsService) { }

  @Get()
  findAll(): Student[] {
    console.log('IN FIND ALL');
    return this.students.getStudents();
  }

  @Get(':id')
  findOne(@Param() params): Student {
    return this.students.getStudent(params.id);
  }

  @Post()
  async create(@Body() student: StudentCreatePayload): Promise<Student> {
    return this.students.createStudent(student);
  }
}

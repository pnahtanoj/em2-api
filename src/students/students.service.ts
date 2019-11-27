import { Injectable } from '@nestjs/common';
import { Student, StudentCreatePayload } from './Student';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    {
      firstName: 'Tommy',
      lastName: 'Boy',
      dob: new Date(2015, 6, 12)
    },
    {
      firstName: 'Tammy',
      lastName: 'Girl',
      dob: new Date(2013, 12, 12)
    }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  getStudent(id: number) {
    return this.students[id];
  }

  createStudent(student: StudentCreatePayload): Student {
    console.log(student);
    console.log(new Date(student.dob));

    const newStudent: Student = {
      ...student,
      dob: new Date(student.dob)
    };

    this.students.push(newStudent);

    return newStudent;
  }
}

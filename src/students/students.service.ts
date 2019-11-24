import { Injectable } from '@nestjs/common';
import { Student } from './Student';

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
}

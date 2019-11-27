export type Student = Readonly<{
  firstName: string;
  lastName: string;
  dob: Date;
}>;

export type StudentCreatePayload = Readonly<{
  firstName: string;
  lastName: string;
  dob: string;
}>;

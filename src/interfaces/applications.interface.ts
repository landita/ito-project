type MedicalUnit = 'isss' | 'minsal';

interface Applications {
  id?: string;
  employeeId?: string;
  medicalUnit?: MedicalUnit;
  startDate?: Date;
  endDate?: Date;
  doctorName?: string;
  medicalDiagnostic?: string;
  coverageDays?: number;
}
export default Applications;

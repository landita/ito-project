type MedicalUnit = 'isss' | 'minsal';

interface Applications {
  id?: string;
  employeeId?: string;
  medicalUnit?: MedicalUnit;
  startDate: Date | string | number;
  endDate: Date | string | number;
  doctorName?: string;
  medicalDiagnostic?: string;
  coverageDays?: number;
}
interface ApplicationStore {
  applications?: Applications[];
  setApplications: (data: Applications[]) => void;
}

export type { Applications, ApplicationStore };

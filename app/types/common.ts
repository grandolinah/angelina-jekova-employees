export interface DataRow {
  id?: number;
  DateFrom: string;
  DateTo: string;
  EmpID: string;
  ProjectID: string;
}

export interface ProjectDateRangeType {
  dateFrom: Date;
  dateTo: Date;
}

export interface EmployeeProjects {
  [projectId: string]: ProjectDateRangeType;
}

export interface EmployeeProjectMapType {
  [empId: string]: EmployeeProjects;
}

export interface WorkingPairType {
  empIdOne: string;
  empIdTwo: string;
  projectId: string;
  daysWorked: number;
}

export interface ResultType {
  longestWorkingPair: WorkingPairType | null;
  pairs: WorkingPairType[];
}

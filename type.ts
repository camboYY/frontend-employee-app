export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}
export interface Employee {
  employeeId: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  lastName: string;
  middleName: string;
}

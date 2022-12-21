export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}
export interface Employee {
  id: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  lastName: string;
  middleName: string;
}

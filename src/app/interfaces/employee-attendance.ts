import { Employee } from "src/app/interfaces/employee";

export interface EmployeeAttendance {
    id: Number;
    date: String;
    employee: Employee;
    is_present: Boolean;
    advance: Number;
}
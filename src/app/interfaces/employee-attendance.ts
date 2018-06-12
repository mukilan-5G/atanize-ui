import { Employee } from "src/app/interfaces/employee";

export interface EmployeeAttendance {
    date: String;
    employee: Number;
    is_present: Boolean;
    advance: Number;
}
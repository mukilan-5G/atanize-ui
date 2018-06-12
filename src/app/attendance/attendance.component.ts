import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkTypes } from 'src/app/interfaces/work-types';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeAttendance } from 'src/app/interfaces/employee-attendance';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  date = new Date();
  selectedWorkType: String = "";
  workTypes: WorkTypes[];
  employees: Employee[];

  displayedColumns = ['name', 'status', 'advance'];
  dataSource = new MatTableDataSource<EmployeeAttendance>(employeeAttendance);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getEmployees();
    this.employeeService.getWorkTypes().subscribe((data: WorkTypes[]) => {
      this.workTypes = data;
    });
  }

  getEmployees() {
    employeeAttendance = [];
    this.employeeService.getEmployees(this.selectedWorkType).subscribe((data: Employee[]) => {
      this.employees = data;
      this.employees.forEach(employee => {
        employeeAttendance.push(this.addEmployeeAttendance(employee));
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployeeName(id) {
    var employees = this.employees.filter(item => item.id === id);
    return employees[0].name;
  }

  addEmployeeAttendance(employee: Employee): EmployeeAttendance {
    return {
      date: "",
      employee: employee.id,
      is_present: false,
      advance: 0
    };
  }
}

let employeeAttendance: EmployeeAttendance[] = [];
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkTypes } from 'src/app/interfaces/work-types';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeAttendance } from 'src/app/interfaces/employee-attendance';
import { formatDate } from '@angular/common';
import { Inject } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  date = new Date();
  selectedWorkType: String = "0";
  workTypes: WorkTypes[];

  displayedColumns = ['name', 'status', 'advance'];
  dataSource = new MatTableDataSource<EmployeeAttendance>(employeeAttendance);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAttendance();
    this.employeeService.getWorkTypes().subscribe((data: WorkTypes[]) => {
      this.workTypes = data;
    });
  }

  getAttendance() {
    employeeAttendance = [];
    this.employeeService.getAttendance(formatDate(this.date, 'yyyy-MM-dd', this.locale), this.selectedWorkType).subscribe((data: EmployeeAttendance[]) => {
      employeeAttendance = data;
      this.dataSource = new MatTableDataSource<EmployeeAttendance>(employeeAttendance);
      this.changeDetectorRef.detectChanges();
    });
  }

  saveAttendance() {
    this.employeeService.saveAttendance(
      formatDate(this.date, 'yyyy-MM-dd', this.locale),
      this.selectedWorkType,
      employeeAttendance
    ).subscribe((data: EmployeeAttendance[]) => {
      employeeAttendance = data;
      this.dataSource = new MatTableDataSource<EmployeeAttendance>(employeeAttendance);
      this.changeDetectorRef.detectChanges();
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
}

let employeeAttendance: EmployeeAttendance[] = [];
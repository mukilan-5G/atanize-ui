import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ChangeDetectorRef } from '@angular/core';
import { WorkTypes } from 'src/app/interfaces/work-types';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {

  formData = {

  };
  workTypes: WorkTypes[];
  selectedWorkType: String = '0';

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getWorkTypes();
  }

  getWorkTypes() {
    this.employeeService.getWorkTypes().subscribe((data: WorkTypes[]) => {
      this.workTypes = data;
    });
  }

}

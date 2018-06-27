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

  error: any;
  formData = {
    "name": "",
    "phone_no": "",
    "address": "",
    "created_by": 1,
    "type_of_work": ""
  };

  workTypes: WorkTypes[];

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getWorkTypes();
  }

  getWorkTypes() {
    this.employeeService.getWorkTypes().subscribe((data: WorkTypes[]) => {
      this.workTypes = data;
      this.formData = {
        "name": "",
        "phone_no": "",
        "address": "",
        "created_by": 1,
        "type_of_work": ""
      };
    });
  }

  registerEmployee() {
    this.employeeService.registerEmployee(this.formData).subscribe((data: any) => {
      this.formData = data;
    }, error => {
      if (error.status == 400) {
        this.error = error.error;
      }
    })
  }

  isError(key) {
    return this.error.hasOwnProperty(key);
  }

}

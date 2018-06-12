import { Injectable } from '@angular/core';
import { Config } from 'src/app/interfaces/config';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  config: Config;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.getConfig().subscribe((data: Config) => {
      this.config = data;
      console.log(this.config);
    });
  }

  getEmployees(type_of_work) {
    if (type_of_work != '')
      return this.http.get(this.config.HOST + "api/employees?type_of_work=" + type_of_work);
    return this.http.get(this.config.HOST + "api/employees");
  }

  getWorkTypes() {
    console.log(this.config);
    return this.http.get(this.config.HOST + "api/work_types");
  }

}

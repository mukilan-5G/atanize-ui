import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config: Config;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.getConfig().subscribe((data: Config) => {
      this.config = data;
    });
  }

  getAuthToken(username, password) {
    console.log(this.config.HOST);
    return this.http.post(this.config.HOST + "api-token-auth/", {
      username: username,
      password: password
    });
  }
}

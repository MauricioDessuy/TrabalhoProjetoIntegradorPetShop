import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  loginUrl = 'http://localhost:8080/pessoas/logar';

  constructor(private http: HttpClient) { }

  logar(login : any) {
    return this.http.post(this.loginUrl, login);
  }

}
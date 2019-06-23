import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackBarUtil } from './snack-bar-util';

@Injectable()
export class LoginService {

  loginUrl = 'http://localhost:8080/pessoas/logar';

  private usuarioAutenticado : boolean = false;

  mostrarMenuEmiter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient, private snackBar : SnackBarUtil) { }

  loginCorreto() {
    this.router.navigate(['home']);
  }

  logar(login : any) {
    return this.http.post(this.loginUrl, login).subscribe(resposta => {
      if (resposta == true) {
        this.loginCorreto();
        this.usuarioAutenticado = true;
        this.mostrarMenuEmiter.emit(true);
      } else {
        this.snackBar.openSnackBar("Login incorreto!", "Ok");
        this.usuarioAutenticado = false;
        this.mostrarMenuEmiter.emit(false);
      }
    });
  }

  usuarioEstaLogado() {
    return this.usuarioAutenticado;
  }

}
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario : Usuario = new Usuario();

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    
  }

  logar(frm: FormGroup) {
    this.loginService.logar(this.usuario);
    frm.reset();
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.login = {};
  }

  logar(frm : FormGroup) {
    this.loginService.logar(this.login).subscribe(resposta => {
      console.log(resposta);
      frm.reset();
    });
  }


}

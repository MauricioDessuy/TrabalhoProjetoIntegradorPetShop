import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  mostrarMenu : boolean = false;
  nomeUsuarioLogado : any;

  constructor(private router: Router, private loginService : LoginService) {

  }

  ngOnInit() {
    this.loginService.mostrarMenuEmiter.subscribe(
      mostrar => this.mostrarMenu = mostrar 
    );
    this.loginService.usuarioLogadoEmiter.subscribe(
      usuario => {
        this.loginService.getNomeUsuarioLogado(usuario).subscribe(resposta => {
          this.nomeUsuarioLogado = resposta.nome
        });
      }
    );
  }

  deslogar() {
    this.mostrarMenu = false;
    this.nomeUsuarioLogado = '';
    this.loginService.deslogar();
    this.router.navigate(['login']);
  }
}

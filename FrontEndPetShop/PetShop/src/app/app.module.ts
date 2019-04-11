import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import {NgxMaskModule} from 'ngx-mask'
import { AppComponent } from './app.component';
import { TutoresListagemComponent } from './tutores-listagem/tutores-listagem.component';
import { TutorService } from './tutor.service';
import { CadPessoaComponent } from './cad-pessoa/cad-pessoa.component';
import { PessoaService } from './pessoa.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ProdutoService } from './produto.service';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { AppRoutingModule} from './app-routing.module';
import { Erro404Component } from './erro404/erro404.component';
import { AuthGuard } from './guards/auth.guard';
import { CadAnimalComponent } from './cad-animal/cad-animal.component';
import { AnimalService } from './animal.service';

@NgModule({
  declarations: [
    AppComponent,
    TutoresListagemComponent,
    CadPessoaComponent,
    LoginComponent,
    CadProdutoComponent,
    Erro404Component,
    CadAnimalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    NgxMaskModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ TutorService, PessoaService, LoginService, ProdutoService, AuthGuard, AnimalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

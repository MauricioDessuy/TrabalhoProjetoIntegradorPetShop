import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { TutoresListagemComponent } from './tutores-listagem/tutores-listagem.component';
import { TutorService } from './tutor.service';
import { CadPessoaComponent } from './cad-pessoa/cad-pessoa.component';
import { PessoaService } from './pessoa.service';


@NgModule({
  declarations: [
    AppComponent,
    TutoresListagemComponent,
    CadPessoaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ TutorService, PessoaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

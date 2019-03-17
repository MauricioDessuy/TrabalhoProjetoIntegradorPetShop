import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TutoresListagemComponent } from './tutores-listagem/tutores-listagem.component';
import { TutorService } from './tutor.service';


@NgModule({
  declarations: [
    AppComponent,
    TutoresListagemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ TutorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

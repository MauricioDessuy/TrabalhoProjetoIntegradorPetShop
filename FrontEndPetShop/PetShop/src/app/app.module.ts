import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

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
    HttpClientModule,
    FormsModule
  ],
  providers: [ TutorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

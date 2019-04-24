import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { TutorService } from './tutor.service';
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
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatInputModule, 
  MatFormFieldModule, 
  MatRippleModule,
  MatDatepickerModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule, 
  MatGridListModule, 
  MatCardModule, 
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatRadioModule
} from '@angular/material';
import 'hammerjs';
import { PessoaFormComponent } from './cad-pessoa/pessoa-form/pessoa-form.component';
import { CadPessoaComponent } from './cad-pessoa/cad-pessoa.component';
import { ProdutoFormComponent } from './cad-produto/produto-form/produto-form.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ModVendasComponent } from './mod-vendas/mod-vendas.component';
import { PessoaListDialog } from './cad-pessoa/pessoa-list-dialog';
import { SnackBarUtil } from './snack-bar-util';
import { ProdutoListDialog } from './cad-produto/produto-list-dialog';

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatRadioModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadProdutoComponent,
    Erro404Component,
    CadAnimalComponent,
    PessoaFormComponent,
    CadPessoaComponent,
    ProdutoFormComponent,
    ModVendasComponent,
    PessoaListDialog,
    ProdutoListDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [
    materialModules
  ],
  providers: [ TutorService, PessoaService, LoginService, ProdutoService, AuthGuard, AnimalService, SnackBarUtil ],
  bootstrap: [AppComponent],
  entryComponents: [PessoaListDialog, ProdutoListDialog],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadPessoaComponent } from './cad-pessoa/cad-pessoa.component';
import { PessoaFormComponent } from './cad-pessoa/pessoa-form/pessoa-form.component';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { CadAnimalComponent } from './cad-animal/cad-animal.component';
import { LoginComponent} from './login/login.component';
import { Erro404Component} from './erro404/erro404.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'cad-pessoa', component: CadPessoaComponent, canActivate : [ AuthGuard ] }, 
  { path: 'cad-pessoa/novo', component: PessoaFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-pessoa/:id', component: PessoaFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-produto', component: CadProdutoComponent, canActivate : [ AuthGuard ] },
  { path: ':id/cad-animal', component: CadAnimalComponent, canActivate : [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: Erro404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

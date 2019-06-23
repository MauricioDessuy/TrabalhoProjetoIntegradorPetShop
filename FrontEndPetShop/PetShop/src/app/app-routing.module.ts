import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadPessoaComponent } from './cad-pessoa/cad-pessoa.component';
import { PessoaFormComponent } from './cad-pessoa/pessoa-form/pessoa-form.component';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { CadAnimalComponent } from './cad-animal/cad-animal.component';
import { LoginComponent} from './login/login.component';
import { Erro404Component} from './erro404/erro404.component';
import { AuthGuard } from './guards/auth.guard';
import { ProdutoFormComponent } from './cad-produto/produto-form/produto-form.component';
import { ModVendasComponent } from './mod-vendas/mod-vendas.component';
import { CadFornecedorComponent } from './cad-fornecedor/cad-fornecedor.component';
import { FornecedorFormComponent } from './cad-fornecedor/fornecedor-form/fornecedor-form.component';
import { RelVendasComponent } from './rel-vendas/rel-vendas.component';
import { MovVacinaComponent } from './mov-vacina/mov-vacina.component';
import { ControleVacinaComponent } from './controle-vacina/controle-vacina.component';
import { AnimalFormComponent } from './cad-animal/animal-form/animal-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate : [ AuthGuard ] }, 
  { path: 'cad-pessoa', component: CadPessoaComponent, canActivate : [ AuthGuard ] }, 
  { path: 'cad-pessoa/novo', component: PessoaFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-pessoa/:id', component: PessoaFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-produto', component: CadProdutoComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-produto/novo', component: ProdutoFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-produto/:id', component: ProdutoFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-fornecedor', component: CadFornecedorComponent, canActivate : [ AuthGuard ] }, 
  { path: 'cad-fornecedor/novo', component: FornecedorFormComponent, canActivate : [ AuthGuard ] },
  { path: 'cad-fornecedor/:id', component: FornecedorFormComponent, canActivate : [ AuthGuard ] },
  { path: ':id/cad-animal', component: CadAnimalComponent, canActivate : [ AuthGuard ] },
  { path: ':id_pessoa/cad-animal/novo', component: AnimalFormComponent, canActivate : [ AuthGuard ] },
  { path: ':id_pessoa/cad-animal/:id', component: AnimalFormComponent, canActivate : [ AuthGuard ] },
  { path: 'mod-vendas', component: ModVendasComponent, canActivate : [ AuthGuard ] },
  { path: 'rel-vendas', component: RelVendasComponent, canActivate : [ AuthGuard ] },
  { path: 'mov-vacina', component: MovVacinaComponent, canActivate : [ AuthGuard ] },
  { path: 'controle-vacina', component: ControleVacinaComponent, canActivate : [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: Erro404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

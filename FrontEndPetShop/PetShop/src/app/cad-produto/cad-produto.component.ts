import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})
export class CadProdutoComponent implements OnInit {

  produtos: Array<any>;
  produto: any;

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produto = {};
    this.listar();
  }

  listar() {
<<<<<<< HEAD
    this.produtoService.listar("")
=======
    this.produtoService.listar('')
>>>>>>> master
      .subscribe(dados => this.produtos = dados);
  }

  adicionar(frm : FormGroup) {
    this.produto.valorUnitario = this.produto.valorUnitario.replace(",", ".");
    this.produtoService.adicionar(this.produto).subscribe(resposta => {
      this.produtos.push(resposta);
      frm.reset();
    });
  }

  deletar(id : any) {
    this.produtoService.deletar(id).subscribe(resposta => {
      console.log(resposta);
      this.listar();
    });
  }

  redirecionarParaAlteracao(id: any) {
    this.router.navigate(['cad-produto/' + id]);
  }

  irParaNovo() {
    this.router.navigate(['cad-produto/novo']);
  }

}

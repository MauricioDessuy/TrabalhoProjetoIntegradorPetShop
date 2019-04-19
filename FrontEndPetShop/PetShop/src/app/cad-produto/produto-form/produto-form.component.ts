import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../produto.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  produto : any;
  idProduto : any;
  inclusao : boolean;

  constructor(private produtoService: ProdutoService,
              private router: Router, 
              private minhaRota: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idProduto = res.id);
    this.produto = {};
    this.inclusao = true;
    if (this.idProduto != null) {
      this.buscar(this.idProduto);
      this.inclusao = false;
    }
  }

  adicionar(frm: FormGroup) {
    this.produto.valorUnitario = this.produto.valorUnitario.replace(",", ".");
    if (this.inclusao) {
      this.produtoService.adicionar(this.produto).subscribe(resposta => {
        this.router.navigate(['cad-produto']);
        frm.reset();
        this.openSnackBar("Registro incluído!", "Ok");
      });
    } else {
      this.produtoService.alterar(this.produto).subscribe(resposta => {
        this.router.navigate(['cad-produto']);
        frm.reset();
        this.openSnackBar("Cadastro atualizado!", "Ok");
      });
    }
  }

  buscar(id: any) {
    this.produtoService.buscar(id).subscribe(resposta => {
      this.produto = resposta;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  retornar() {
    this.router.navigate(['cad-produto']);
  }

}

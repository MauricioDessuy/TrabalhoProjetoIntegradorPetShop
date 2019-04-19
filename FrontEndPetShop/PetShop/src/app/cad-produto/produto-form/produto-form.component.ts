import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../produto.service';


@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  produto : any;
  idProduto : any;
  inclusao : boolean;

  constructor(private produtoService: ProdutoService, private router: Router, private minhaRota: ActivatedRoute) { }

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
    if (this.inclusao) {
      this.produtoService.adicionar(this.produto).subscribe(resposta => {
        this.router.navigate(['cad-produto']);
        frm.reset();
      });
    } else {
      this.produtoService.alterar(this.produto).subscribe(resposta => {
        this.router.navigate(['cad-produto']);
        frm.reset();
      });
    }
  }

  buscar(id: any) {
    this.produtoService.buscar(id).subscribe(resposta => {
      this.produto = resposta;
    });
  }


}

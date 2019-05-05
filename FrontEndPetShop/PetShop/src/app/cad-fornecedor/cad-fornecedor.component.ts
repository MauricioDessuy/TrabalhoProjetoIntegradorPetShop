import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FornecedorService } from '../fornecedor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cad-fornecedor',
  templateUrl: './cad-fornecedor.component.html',
  styleUrls: ['./cad-fornecedor.component.css']
})
export class CadFornecedorComponent implements OnInit {

  fornecedores: Array<any>;
  fornecedor: any;
  idFornecedor: any;
  inclusao: boolean;

  constructor(private fornecedorService: FornecedorService, private router: Router, private minhaRota: ActivatedRoute) { }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idFornecedor = res.id);
    this.fornecedor = {};
    this.inclusao = true;
    if (this.idFornecedor != null) {
      this.buscar(this.idFornecedor);
      this.inclusao = false;
    }
    this.listar();
  }

  listar() {
    this.fornecedorService.listar()
      .subscribe(dados => this.fornecedores = dados);
  }

  deletar(id: any) {
    this.fornecedorService.deletar(id).subscribe(resposta => {
      this.listar();
    });
  }

  buscar(id: any) {
    this.fornecedorService.buscar(id).subscribe(resposta => {
      this.fornecedor = resposta;
    });
  }

  redirecionarParaAlteracao(id: any) {
    this.router.navigate(['cad-fornecedor/' + id]);
  }

  irParaNovo() {
    this.router.navigate(['cad-fornecedor/novo']);
  }

}

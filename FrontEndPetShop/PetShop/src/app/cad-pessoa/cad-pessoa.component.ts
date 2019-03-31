import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-cad-pessoa',
  templateUrl: './cad-pessoa.component.html',
  styleUrls: ['./cad-pessoa.component.css']
})
export class CadPessoaComponent implements OnInit {

  pessoas: Array<any>;
  pessoa: any;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pessoa = {};
    this.listar();
  }

  listar() {
    this.pessoaService.listar()
      .subscribe(dados => this.pessoas = dados);
  }

  adicionar(frm : FormGroup) {
    this.pessoaService.adicionar(this.pessoa).subscribe(resposta => {
      this.pessoas.push(resposta);
      frm.reset();
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cad-pessoa',
  templateUrl: './cad-pessoa.component.html',
  styleUrls: ['./cad-pessoa.component.css']
})
export class CadPessoaComponent implements OnInit {

  pessoas: Array<any>;
  pessoa: any;
  idPessoa: any;
  inclusao: boolean;

  constructor(private pessoaService: PessoaService, private router: Router, private minhaRota: ActivatedRoute) { }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idPessoa = res.id);
    this.pessoa = {};
    this.inclusao = true;
    if (this.idPessoa != null) {
      this.buscar(this.idPessoa);
      this.inclusao = false;
    }
    this.listar();
  }

  listar() {
    this.pessoaService.listar('')
      .subscribe(dados => this.pessoas = dados);
  }

  deletar(id: any) {
    this.pessoaService.deletar(id).subscribe(resposta => {
      this.listar();
    });
  }

  buscar(id: any) {
    this.pessoaService.buscar(id).subscribe(resposta => {
      if (resposta.sexo == 'MASCULINO') {
        resposta.sexo = 0;
      } else {
        resposta.sexo = 1;
      }
      this.pessoa = resposta;
    });
  }

  redirecionarParaAlteracao(id: any) {
    this.router.navigate(['cad-pessoa/' + id]);
  }

  cadastrarAnimal(id: any) {
    this.router.navigate([id + '/cad-animal']);
  }

  irParaNovo() {
    this.router.navigate(['cad-pessoa/novo']);
  }

}

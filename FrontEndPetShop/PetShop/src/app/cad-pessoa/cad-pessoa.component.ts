import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cad-pessoa',
  templateUrl: './cad-pessoa.component.html',
  styleUrls: ['./cad-pessoa.component.css']
})
export class CadPessoaComponent implements OnInit {

  pessoas: Array<any>;
  pessoa: any;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.pessoa = {};
    this.listar();
  }

  listar() {
    this.pessoaService.listar()
      .subscribe(dados => this.pessoas = dados);
  }

  adicionar(frm : FormGroup) {
    this.pessoa.dataNascimento = new Date(this.pessoa.dataNascimento + ' 03:00:00 GMT');
    this.pessoaService.adicionar(this.pessoa).subscribe(resposta => {
      this.pessoas.push(resposta);
      frm.reset();
    });
  }

  deletar(id : any) {
    this.pessoaService.deletar(id).subscribe(resposta => {
      console.log(resposta);
      this.listar();
    });
  }

  cadastrarAnimal(id : any){
    this.router.navigate([id+'/cad-animal']);

  }

}

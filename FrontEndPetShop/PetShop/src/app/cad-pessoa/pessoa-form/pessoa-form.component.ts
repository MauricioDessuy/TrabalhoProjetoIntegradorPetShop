import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PessoaService } from '../../pessoa.service';
import { SnackBarUtil } from '../../snack-bar-util';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  pessoa: any;
  idPessoa: any;
  inclusao: boolean;

  constructor(private pessoaService: PessoaService, 
              private router: Router, 
              private minhaRota: ActivatedRoute,
              private snackBarUtil: SnackBarUtil) { }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idPessoa = res.id);
    this.pessoa = {};
    this.inclusao = true;
    if (this.idPessoa != null) {
      this.buscar(this.idPessoa);
      this.inclusao = false;
    }
  }

  adicionar(frm: FormGroup) {
    this.pessoa.dataNascimento = new Date(this.pessoa.dataNascimento + ' 03:00:00 GMT');
    if (this.inclusao) {
      this.pessoaService.adicionar(this.pessoa).subscribe(resposta => {
        this.router.navigate(['cad-pessoa']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Registro incluído!", "OK");
      }, erro => {
        this.router.navigate(['cad-pessoa']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao incluir!", "OK");
      });
    } else {
      this.pessoaService.alterar(this.pessoa).subscribe(resposta => {
        this.router.navigate(['cad-pessoa']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Cadastro atualizado!", "OK");
      }, erro => {
        this.router.navigate(['cad-pessoa']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao atualizar!", "OK");
      });
    }
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

  retornar() {
    this.router.navigate(['cad-pessoa']);
  }

}

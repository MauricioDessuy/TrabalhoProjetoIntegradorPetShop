import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PessoaService } from '../../pessoa.service';
import { MatSnackBar } from '@angular/material';

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
              private snackBar: MatSnackBar) { }

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
        this.openSnackBar("Registro incluído!", "OK");
      });
    } else {
      this.pessoaService.alterar(this.pessoa).subscribe(resposta => {
        this.router.navigate(['cad-pessoa']);
        frm.reset();
        this.openSnackBar("Cadastro atualizado!", "OK");
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  retornar() {
    this.router.navigate(['cad-pessoa']);
  }

}

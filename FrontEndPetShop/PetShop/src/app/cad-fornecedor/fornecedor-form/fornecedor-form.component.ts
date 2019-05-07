import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FornecedorService } from '../../fornecedor.service';
import { SnackBarUtil } from '../../snack-bar-util';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  fornecedor: any;
  idFornecedor: any;
  inclusao: boolean;

  constructor(private fornecedorService: FornecedorService, 
              private router: Router, 
              private minhaRota: ActivatedRoute,
              private snackBarUtil: SnackBarUtil) { }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idFornecedor = res.id);
    this.fornecedor = {};
    this.inclusao = true;
    if (this.idFornecedor != null) {
      this.buscar(this.idFornecedor);
      this.inclusao = false;
    }
  }

  adicionar(frm: FormGroup) {
    this.fornecedor.dataNascimento = new Date(this.fornecedor.dataNascimento + ' 03:00:00 GMT');
    if (this.inclusao) {
      this.fornecedorService.adicionar(this.fornecedor).subscribe(resposta => {
        this.router.navigate(['cad-fornecedor']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Registro incluído!", "OK");
      }, erro => {
        this.router.navigate(['cad-fornecedor']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao incluir!", "Ok");
      });
    } else {
      this.fornecedorService.alterar(this.fornecedor).subscribe(resposta => {
        this.router.navigate(['cad-fornecedor']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Cadastro atualizado!", "OK");
      }, erro => {
        this.router.navigate(['cad-fornecedor']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao atualizar!", "Ok");
      });
    }
  }

  buscar(id: any) {
    this.fornecedorService.buscar(id).subscribe(resposta => {
      this.fornecedor = resposta;
    });
  }

  retornar() {
    this.router.navigate(['cad-fornecedor']);
  }

}


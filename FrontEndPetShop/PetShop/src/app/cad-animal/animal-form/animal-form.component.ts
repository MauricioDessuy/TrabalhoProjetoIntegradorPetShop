import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AnimalService } from '../../animal.service';
import { SnackBarUtil } from '../../snack-bar-util';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  animal: any;
  idPessoa: any;
  idAnimal: any;
  inclusao: boolean;

  constructor(
    private animalService: AnimalService,
    private router: Router,
    private minhaRota: ActivatedRoute,
    private snackBarUtil: SnackBarUtil) {
    this.minhaRota.params.subscribe(res => this.idPessoa = res.id_pessoa)
  }

  ngOnInit() {
    this.minhaRota.params.subscribe(res => this.idAnimal = res.id);
    this.animal = {};
    this.inclusao = true;
    if (this.idAnimal != null) {
      this.buscar(this.idAnimal);
      this.inclusao = false;
    }
  }

  adicionar(frm: FormGroup) {
    this.animal.pessoa = { id: this.idPessoa };
    this.animal.dataNascimento = new Date(this.animal.dataNascimento + ' 03:00:00 GMT');
    if (this.inclusao) {
      this.animalService.adicionar(this.animal).subscribe(resposta => {
        this.router.navigate([this.idPessoa + '/cad-animal']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Registro incluído!", "OK");
      }, erro => {
        this.router.navigate([this.idPessoa + '/cad-animal']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao incluir!", "OK");
      });
    } else {
      this.animalService.alterar(this.animal).subscribe(resposta => {
        this.router.navigate([this.idPessoa + '/cad-animal']);
        frm.reset();
        this.snackBarUtil.openSnackBar("Cadastro atualizado!", "OK");
      }, erro => {
        this.router.navigate([this.idPessoa + '/cad-animal']);
        frm.reset();
        this.snackBarUtil.openSnackBarMsgErro("Erro ao atualizar!", "OK");
      });
    }
  }

  buscar(id: any) {
    this.animalService.buscar(id).subscribe(resposta => {
      this.animal = resposta;
    });
  }

  retornar() {
    this.router.navigate(['cad-animal']);
  }

}
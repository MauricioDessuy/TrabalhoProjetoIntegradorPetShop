import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-cad-animal',
  templateUrl: './cad-animal.component.html',
  styleUrls: ['./cad-animal.component.css']
})
export class CadAnimalComponent implements OnInit {
  
  private idPessoa: any;
  animals: Array<any>;
  animal: any;
  animalFiltro : any;
  private idAnimal: any;

  constructor(private animalService: AnimalService, private minhaRota: ActivatedRoute, private router : Router) {
    this.minhaRota.params.subscribe(res => this.idPessoa = res.id);
   }

  ngOnInit() {
    this.animal = {};
    this.animalFiltro = {};
    this.listar();
  }

  listar() {
    this.animalFiltro.pessoa = { id : this.idPessoa };
    this.animalService.listar(this.animalFiltro)
      .subscribe(dados => this.animals = dados);
  }

  adicionar(frm : FormGroup) {
    this.animal.dataNascimento = new Date(this.animal.dataNascimento + ' 03:00:00 GMT');
    this.animal.pessoa = { id : this.idPessoa };
    this.animalService.adicionar(this.animal).subscribe(resposta => {
      this.animals.push(resposta);
      frm.reset();
    });
  }

  deletar(id : any) {
    this.animalService.deletar(id).subscribe(resposta => {
      this.listar();
    });
  }

  redirecionarParaAlteracao(id: any) {
    this.router.navigate([this.idPessoa + '/cad-animal/' + id]);
  }

  irParaNovo() {
    this.router.navigate([this.idPessoa + '/cad-animal/novo']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { VacinaService } from '../vacina.service';

@Component({
  selector: 'controle-vacina',
  templateUrl: './controle-vacina.component.html',
  styleUrls: ['./controle-vacina.component.css']
})
export class ControleVacinaComponent implements OnInit {

  vacinas: Array<any>;
  vacina: any;
  private filtro : any;

  constructor(private router: Router, private controleVacinaService: VacinaService) { }

  ngOnInit() {
    this.vacina = {};
    this.filtro = {};
    this.listar();
    
  }

  listar() {
    var dtIniTemp = this.filtro.dataInicial;
    var dtFinTemp = this.filtro.dataFinal;
    if (this.filtro.dataInicial != null && this.filtro.dataInicial != '') {
      this.filtro.dataInicial = new Date(this.filtro.dataInicial + ' 03:00:00 GMT');
      console.log(this.filtro.dataInicial);
    }
    if (this.filtro.dataFinal != null && this.filtro.dataFinal != '') {
      this.filtro.dataFinal = new Date(this.filtro.dataFinal + ' 03:00:00 GMT');
      console.log(this.filtro.dataFinal);
    }
    
    
    this.controleVacinaService.listar(this.filtro).subscribe(dados => this.vacinas = dados);
    this.filtro.dataInicial = dtIniTemp;
    this.filtro.dataFinal = dtFinTemp;
  }

}
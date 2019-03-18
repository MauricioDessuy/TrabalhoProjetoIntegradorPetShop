import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TutorService } from '../tutor.service';

@Component({
  selector: 'app-tutores-listagem',
  templateUrl: './tutores-listagem.component.html',
  styleUrls: ['./tutores-listagem.component.css']
})
export class TutoresListagemComponent implements OnInit {

  tutores: Array<any>;
  tutor: any;

  constructor(private tutorService: TutorService) { }

  ngOnInit() {
    this.tutor = {};
    this.listar();
  }

  listar() {
    this.tutorService.listar()
      .subscribe(dados => this.tutores = dados);
  }

  adicionar(frm : FormGroup) {
    this.tutorService.adicionar(this.tutor).subscribe(resposta => {
      this.tutores.push(resposta);
      frm.reset();
    });
  }


}

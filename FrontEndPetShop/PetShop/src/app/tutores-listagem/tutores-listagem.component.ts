import { Component, OnInit } from '@angular/core';

import { TutorService } from '../tutor.service';

@Component({
  selector: 'app-tutores-listagem',
  templateUrl: './tutores-listagem.component.html',
  styleUrls: ['./tutores-listagem.component.css']
})
export class TutoresListagemComponent implements OnInit {

  tutores: Array<any>;

  constructor(private tutorService: TutorService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.tutorService.listar()
      .subscribe(dados => this.tutores = dados);
  }

}

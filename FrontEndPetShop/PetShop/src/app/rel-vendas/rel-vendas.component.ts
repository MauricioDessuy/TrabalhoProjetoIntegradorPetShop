import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { RelvendasService } from '../relvendas.service';

@Component({
  selector: 'app-rel-vendas',
  templateUrl: './rel-vendas.component.html',
  styleUrls: ['./rel-vendas.component.css']
})
export class RelVendasComponent implements OnInit {

  private filtro : any;
  private relGerado : boolean;
  
  constructor(private pdfView : PdfViewComponent, private relvenda : RelvendasService) { }

  ngOnInit() {
    this.filtro = {};
    this.filtro.formaPagamento = -1;
    this.relGerado = false;
  }

  gerarRelatorio() {
    this.relvenda.gerarRelatorio(this.filtro).subscribe(resposta => {
      console.log(resposta.pdf);
      //this.pdfView.setPdf(resposta.pdf);
      this.pdfView.setPdf("https://indubrasil.org.br/post/ba2170962b.pdf");
    });
    this.relGerado = true;
  }

}

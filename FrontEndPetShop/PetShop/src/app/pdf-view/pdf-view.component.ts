import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {

  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pagina: number = 1;
  totalPaginas: number;
  carregou: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  relCarregado(pdfData: any) {
    this.totalPaginas = pdfData.numPages;
    this.carregou = true;
  }

  proximaPagina() {
    this.pagina++;
  }

  paginaAnterior() {
    this.pagina--;
  }

  setPdf(pdf : any) {
    this.src = pdf;
  }

}

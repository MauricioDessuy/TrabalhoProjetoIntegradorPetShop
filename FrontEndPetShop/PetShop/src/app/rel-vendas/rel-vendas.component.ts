import { Component, OnInit } from '@angular/core';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { VendaService } from '../venda.service';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rel-vendas',
  templateUrl: './rel-vendas.component.html',
  styleUrls: ['./rel-vendas.component.css']
})
export class RelVendasComponent implements OnInit {

  private filtro : any;
  
  constructor(private pdfView : PdfViewComponent, private relvenda : VendaService, private router: Router,
    private minhaRota: ActivatedRoute) { }

  ngOnInit() {
    this.filtro = {};
    this.filtro.formaPagamento = -1;
  }

  gerarRelatorio() {
    var dtIniTemp = this.filtro.dataInicial;
    var dtFinTemp = this.filtro.dataFinal;
    if (this.filtro.dataInicial != null && this.filtro.dataInicial != '') {
      this.filtro.dataInicial = new Date(this.filtro.dataInicial + ' 03:00:00 GMT');
    }
    if (this.filtro.dataFinal != null && this.filtro.dataFinal != '') {
      this.filtro.dataFinal = new Date(this.filtro.dataFinal + ' 03:00:00 GMT');
    }
    this.relvenda.gerarRelatorio(this.filtro).subscribe(blob => {
      saveAs(blob, 'RelatórioVenda-' + new Date().toLocaleDateString() + ".pdf");
      this.pdfView.setPdf(blob);
    });
    this.filtro.dataInicial = dtIniTemp;
    this.filtro.dataFinal = dtFinTemp;
  }

}

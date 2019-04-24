import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { VendaService } from '../venda.service';
import { PessoaListDialog } from '../cad-pessoa/pessoa-list-dialog';
import { PessoaService } from '../pessoa.service';
import { SnackBarUtil } from '../snack-bar-util';
import { ProdutoService } from '../produto.service';
import { ProdutoListDialog } from '../cad-produto/produto-list-dialog';

@Component({
  selector: 'app-mod-vendas',
  templateUrl: './mod-vendas.component.html',
  styleUrls: ['./mod-vendas.component.css']
})
export class ModVendasComponent implements OnInit {

  venda : any;

  idPessoa : any;
  nomePessoa : any;
  pessoa : any;

  numeroItem : any;
  idProduto : any;
  nomeProduto : any;
  produto : any;
  quantidade : any;
  vlrDesconto : any;
  vlrUnitario : any;
  vendaItem : any;

  constructor(private vendaService: VendaService,
    private router: Router,
    private snackBarUtil: SnackBarUtil,
    public dialog: MatDialog,
    private pessoaService : PessoaService,
    private produtoService : ProdutoService) { }

  ngOnInit() {
    this.venda = {};
    this.venda.listaItens = new Array();
    this.vlrDesconto = 0.00;
    this.quantidade = 1;
    this.numeroItem = 0;
  }

  adicionar(frm: FormGroup) {
    this.venda.dataVenda = new Date();
    this.vendaService.adicionar(this.venda).subscribe(resposta => {
      this.router.navigate(['mod-vendas']);
      frm.reset();
      this.snackBarUtil.openSnackBar("Venda Realizada!", "OK");
    });
  }

  retornar() {
    this.router.navigate(['mod-vendas']);
  }

  abrirTabelaPessoa() {
    const dialogRef = this.dialog.open(PessoaListDialog, {
      width: '850px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarCampoPessoa(result);
    });
  }

  private carregarCampoPessoa(idPes : any) {
    if (idPes != null && !isNaN(parseFloat(idPes)) && isFinite(idPes)) {
      this.pessoaService.buscar(idPes).subscribe(resultadoPessoa => {
        this.venda.pessoa = resultadoPessoa;
        this.venda.idPessoa = resultadoPessoa.id;
        this.venda.nomePessoa = resultadoPessoa.nome;
      }, erro => {
        this.snackBarUtil.openSnackBar("Pessoa não encontrada no banco de dados!", "Ok");
        this.venda.idPessoa = null;
        this.venda.nomePessoa = null;
        this.venda.pessoa = null;
      });
    } else {
      this.venda.idPessoa = null;
      this.venda.nomePessoa = null;
      this.venda.pessoa = null;
    }
  }

  abrirTabelaProduto() {
    const dialogRef = this.dialog.open(ProdutoListDialog, {
      width: '850px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarCampoProduto(result);
    });
  }

  private carregarCampoProduto(idProd : any) {
    if (idProd != null && !isNaN(parseFloat(idProd)) && isFinite(idProd)) {
      this.produtoService.buscar(idProd).subscribe(resultadoProduto => {
        this.produto = resultadoProduto;
        this.idProduto = resultadoProduto.id;
        this.nomeProduto = resultadoProduto.nome;
        this.vlrUnitario = resultadoProduto.valorUnitario;
      }, erro => {
        this.snackBarUtil.openSnackBar("Produto não encontrada no banco de dados!", "Ok");
        this.idProduto = null;
        this.nomeProduto = null;
        this.produto = null;
      });
    } else {
      this.idProduto = null;
      this.nomeProduto = null;
      this.produto = null;
    }
  }

  adicionarProduto() {
    if (this.idProduto == null) {
      this.snackBarUtil.openSnackBar("Informe o produto!", "OK");
      return;
    }
    if (this.quantidade == null) {
      this.snackBarUtil.openSnackBar("Informe a quantidade!", "OK");
      return;
    }
    if (this.vlrUnitario == null) {
      this.snackBarUtil.openSnackBar("Informe o valor unitário!", "OK");
      return;
    }
    this.numeroItem++;
    this.vendaItem = {
      numeroItem : this.numeroItem,
      produto : { id : this.idProduto, nome : this.nomeProduto},
      quantidade : this.quantidade,
      valorUnitario : this.vlrUnitario,
      valorDesconto : this.vlrDesconto
    };
    this.venda.listaItens.push(this.vendaItem);
    this.vendaItem = null;
    this.idProduto = null;
    this.nomeProduto = null;
    this.produto = null;
    this.quantidade = 1;
    this.vlrDesconto = 0.00;
    this.vlrUnitario = null;
  }

  removerItem(itemVenda : any) {
    console.log("entrou metodo");
    var index = this.venda.listaItens.indexOf(itemVenda);
    console.log(index);
    this.venda.listaItens.slice(index, 1);
    this.venda.listaItens = this.venda.listaItens.filter(item => item !== itemVenda);
    console.log(this.venda.listaItens);
  }

}

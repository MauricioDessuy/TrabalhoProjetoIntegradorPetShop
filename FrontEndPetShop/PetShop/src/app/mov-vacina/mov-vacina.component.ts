import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { VacinaService } from '../vacina.service';
import { AnimalListDialog } from '../cad-animal/animal-list-dialog';
import { AnimalService } from '../animal.service';
import { SnackBarUtil } from '../snack-bar-util';
import { ProdutoService } from '../produto.service';
import { ProdutoListDialog } from '../cad-produto/produto-list-dialog';
@Component({
  selector: 'app-mov-vacina',
  templateUrl: './mov-vacina.component.html',
  styleUrls: ['./mov-vacina.component.css']
})
export class MovVacinaComponent implements OnInit {
  vacina: any;

  idAnimal: any;
  nomeAnimal: any;
  animal: any;

  clientePadrao: any;

  numeroItem: any;
  idProduto: any;
  nomeProduto: any;
  produto: any;
  quantidade: any;
  vlrDesconto: any;
  vlrUnitario: any;
  vendaItem: any;

  constructor(private vacinaService: VacinaService,
    private router: Router,
    private snackBarUtil: SnackBarUtil,
    public dialog: MatDialog,
    private pessoaService: AnimalService,
    private animalService: AnimalService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.vacina = {};
    this.animal = {};
  }

  adicionar(frm: FormGroup) {
    this.vacina.dataVacinacao = new Date(this.vacina.dataVacinacao + ' 03:00:00 GMT');
    if (this.idAnimal == null) {
      this.snackBarUtil.openSnackBar("Informe o animal a ser vacinado", "OK");
      return;
    }
    if (this.idProduto == null) {
      this.snackBarUtil.openSnackBar("adicione a vacina", "OK");
      return;
    }
    this.vacina.produto=this.produto;
    this.vacina.animal=this.animal;
    this.vacinaService.adicionar(this.vacina).subscribe(resposta => {
      this.router.navigate(['mov-vacina']);
      frm.reset();
      this.vacina = {};
      this.snackBarUtil.openSnackBar("Operação Realizada!", "OK");
    }, erro => {
      this.router.navigate(['mov-vacina']);
      frm.reset();
      this.vacina = {};
      this.snackBarUtil.openSnackBarMsgErro("Erro ao realizar a operação", "OK");
    });
  }

  retornar() {
    this.router.navigate(['mod-vacina']);
  }

  abrirTabelaAnimal() {
    const dialogRef = this.dialog.open(AnimalListDialog, {
      width: '850px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarCampoAnimal(result);
    });
  }

  private carregarCampoAnimal(idAnimal: any) {
    if (idAnimal != null && !isNaN(parseFloat(idAnimal)) && isFinite(idAnimal)) {
      this.animalService.buscar(idAnimal).subscribe(resultadoAnimal => {
        this.animal = resultadoAnimal;
        this.idAnimal = resultadoAnimal.id;
        this.nomeAnimal = resultadoAnimal.nome;
      }, erro => {
        this.snackBarUtil.openSnackBarMsgErro("Animal não encontrada no banco de dados!", "Ok");
        this.idAnimal = null;
        this.nomeAnimal = null;
        this.animal = null;
      });
    } else {
      this.idAnimal = null;
      this.nomeAnimal = null;
      this.animal = null;
    }
  }

  abrirTabelaProduto() {
    const dialogRef = this.dialog.open(ProdutoListDialog, {
      width: '850px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarCampoProduto(result);
    });
  }

  private carregarCampoProduto(idProd: any) {
    if (idProd != null && !isNaN(parseFloat(idProd)) && isFinite(idProd)) {
      this.produtoService.buscar(idProd).subscribe(resultadoProduto => {
        this.produto = resultadoProduto;
        this.idProduto = resultadoProduto.id;
        this.nomeProduto = resultadoProduto.nome;
      }, erro => {
        this.snackBarUtil.openSnackBarMsgErro("Produto não encontrada no banco de dados!", "Ok");
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
      numeroItem: this.numeroItem,
      produto: { id: this.idProduto, nome: this.nomeProduto },
      quantidade: this.quantidade,
      valorUnitario: this.vlrUnitario,
      valorDesconto: this.vlrDesconto
    };
    this.vacina.listaItens.push(this.vendaItem);
    this.vacina.valorTotal = 0;
    this.vacina.listaItens.forEach(item => {
      this.vacina.valorTotal += item.valorUnitario * item.quantidade;
    });
    this.vendaItem = null;
    this.idProduto = null;
    this.nomeProduto = null;
    this.produto = null;
    this.quantidade = 1;
    this.vlrDesconto = 0.00;
    this.vlrUnitario = null;
  }

}



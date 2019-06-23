import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProdutoService } from '../produto.service';

export interface DialogData {
    idProduto: string;
    nomeProduto: string;
    produto: any;
    tipo : any;
}

@Component({
    selector: 'produto-list-dialog',
    templateUrl: 'produto-list-dialog.html',
})
export class ProdutoListDialog {

    produtos: Array<any>;
    idProdutoSelecionada: any;
    filtro: any;
    tipo : any;

    constructor(
        public dialogRef: MatDialogRef<ProdutoListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private produtoService: ProdutoService) {
        this.filtro = {};
        this.tipo = data.tipo;
        this.listar();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    listar() {
        this.produtoService.listar('', this.tipo).subscribe(dados => this.produtos = dados);
    }

    teclaDigitada(event) {
        if (event.key === "Enter") {
            this.produtoService.listar(this.filtro.nome, this.tipo).subscribe(dados => this.produtos = dados);
        }
    }
}
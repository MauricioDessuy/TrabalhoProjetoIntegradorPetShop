import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProdutoService } from '../produto.service';

export interface DialogData {
    idProduto : string;
    nomeProduto : string;
    produto : any;
}

@Component({
    selector: 'produto-list-dialog',
    templateUrl: 'produto-list-dialog.html',
})
export class ProdutoListDialog {

    produtos: Array<any>;
    idProdutoSelecionada : any;

    constructor(
        public dialogRef: MatDialogRef<ProdutoListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private produtoService: ProdutoService) {
        this.listar();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    listar() {
        this.produtoService.listar().subscribe(dados => this.produtos = dados);
    }
}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PessoaService } from '../pessoa.service';

export interface DialogData {
    idPessoa: string;
    nomePessoa: string;
    pessoa: any;
}

@Component({
    selector: 'pessoa-list-dialog',
    templateUrl: 'pessoa-list-dialog.html',

})
export class PessoaListDialog {

    pessoas: Array<any>;
    idPessoaSelecionada : any;

    constructor(
        public dialogRef: MatDialogRef<PessoaListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private pessoaService: PessoaService) {
        this.listar();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    listar() {
        this.pessoaService.listar().subscribe(dados => this.pessoas = dados);
    }
}
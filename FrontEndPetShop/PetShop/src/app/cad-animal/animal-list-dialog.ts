import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnimalService } from '../animal.service';

export interface DialogData {
    idAnimal: string;
    nomeAnimal: string;
    animal: any;
}

@Component({
    selector: 'animal-list-dialog',
    templateUrl: 'animal-list-dialog.html',

})
export class AnimalListDialog {

    animais: Array<any>;
    idAnimalSelecionado : any;
    filtro: any;

    constructor(
        public dialogRef: MatDialogRef<AnimalListDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private animalService: AnimalService) {
        this.filtro = {};
        this.listar();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    listar() {
        this.animalService.listarTodos().subscribe(dados => this.animais = dados);
    }

    teclaDigitada(event) {
        if (event.key === "Enter") {
            this.animalService.listar(this.filtro.nome).subscribe(dados => this.animais = dados);
        }
    }
}
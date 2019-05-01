import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackBarUtil {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action,  {
            if (condition) {
                
            }
            //duration: 7000,
        });
    }
}

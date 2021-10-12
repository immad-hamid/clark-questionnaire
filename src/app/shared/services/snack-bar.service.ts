import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string = 'Close') {
        this._snackBar.open(message, action);
    }
}

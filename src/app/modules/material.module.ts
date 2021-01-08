import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Module to be used for exporting Material components.
 */
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Module to be used for exporting Material components.
 */
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
})
export class MaterialModule {}

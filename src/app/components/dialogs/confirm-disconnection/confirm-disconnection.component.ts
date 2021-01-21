import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component containing disconnection dialog content.
 */
@Component({
    selector: 'app-confirm-disconnection',
    templateUrl: './confirm-disconnection.component.html',
    styleUrls: ['./confirm-disconnection.component.scss'],
})
export class ConfirmDisconnectionComponent {
    /**
     * @param deviceName Injected device name.
     */
    constructor(@Inject(MAT_DIALOG_DATA) readonly deviceName: string) {}
}

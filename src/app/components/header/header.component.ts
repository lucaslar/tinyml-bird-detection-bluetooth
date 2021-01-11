import { Component, HostListener } from '@angular/core';
import { BluetoothService } from '../../services/bluetooth.service';

/**
 * Component containing the content of the application's header.
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    /**
     * True if the window is scrolled, false if not.
     */
    isScrolled: boolean;

    /**
     * @param bluetooth Injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}

    /**
     * Checks whether the user has scrolled or the scrollbar is at the top and sets
     * {{ isScrolled }} accordingly. (Triggered whenever the window is scrolled)
     */
    @HostListener('window:scroll') onScroll(): void {
        this.isScrolled = window.pageYOffset > 0;
    }
}

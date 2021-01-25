import { Component } from '@angular/core';
import { BluetoothService } from '../../../services/bluetooth.service';
import { heightTransition } from '../../../consts/animations';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/**
 * Component containing a prominent Bluetooth button for connection and some further information.
 */
@Component({
    selector: 'app-bluetooth-connect',
    animations: [heightTransition],
    templateUrl: './bluetooth-connect.component.html',
    styleUrls: ['./bluetooth-connect.component.scss'],
})
export class BluetoothConnectComponent {
    /**
     * Github icon.
     */
    readonly githubIcon = faGithub;

    /**
     * Command for cloning the microcontroller sketch.
     */
    readonly cloneCommand =
        'git clone https://github.com/maxkueh/tinyml_bird_classification.git';

    /**
     * Path to the zip file of the microcontroller sketch.
     */
    readonly zipPath =
        'https://github.com/maxkueh/tinyml_bird_classification/archive/main.zip';

    /**
     * @param bluetooth injected Bluetooth service.
     */
    constructor(readonly bluetooth: BluetoothService) {}
}

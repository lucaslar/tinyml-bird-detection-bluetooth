import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Service class for centrally handling occurring errors.
 */
@Injectable({
    providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
    /**
     * Handles any occurring (uncaught) error: Logs it to the console and informs the user by showing a dialog.
     * TODO: Show dialog
     * @param error Error to be handled.
     */
    handleError(error: any): void {
        console.error(error);
    }
}

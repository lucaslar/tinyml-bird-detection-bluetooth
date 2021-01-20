/**
 * Enumeration of possible connection states (translation keys).
 */
export enum ConnectionState {
    Ready = 'bluetooth.connectionState.ready',
    Searching = 'bluetooth.connectionState.searching',
    ConnectingGatt = 'bluetooth.connectionState.connectingGatt',
    ConnectingCharacteristics = 'bluetooth.connectionState.accessingCharacteristics',
}

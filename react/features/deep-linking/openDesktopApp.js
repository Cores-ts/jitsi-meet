// @flow

/**
 * Opens the desktop app.
 *
 * @param {Object} state - Object containing current redux state.
 * @returns {Promise<boolean>} - Resolves with true if the attempt to open the desktop app was successful and resolves
 * with false otherwise.
 */
export function _openDesktopApp(state: Object) { // eslint-disable-line no-unused-vars
    console.log("OPENDESKTOPAPP2",state)
    const { launchInWeb } = state['features/deep-linking'];

    if (!launchInWeb) {
         window.location = "com.fundingbox.meetings://" + state['features/base/conference'].room
    }
    
    return Promise.resolve(!launchInWeb);
}

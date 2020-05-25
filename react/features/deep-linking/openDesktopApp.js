// @flow
import { Platform } from '../base/react';

/**
 * Opens the desktop app.
 *
 * @param {Object} state - Object containing current redux state.
 * @returns {Promise<boolean>} - Resolves with true if the attempt to open the desktop app was successful and resolves
 * with false otherwise.
 */
export function _openDesktopApp(state: Object) { // eslint-disable-line no-unused-vars
    const { launchInWeb } = state['features/deep-linking'];
    const scheme = interfaceConfig.APP_SCHEME || 'com.fundingbox.meetings';
    const downloadUrl = interfaceConfig[`DESKTOP_DOWNLOAD_LINK_${Platform.OS.toUpperCase()}`]

    if (downloadUrl && state['features/base/conference'].room && !launchInWeb) {
        window.location = scheme + "://" + state['features/base/conference'].room;
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}
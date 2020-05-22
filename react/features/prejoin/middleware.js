// @flow

import { SET_AUDIO_MUTED, SET_VIDEO_MUTED } from '../base/media';
import { MiddlewareRegistry } from '../base/redux';
import { updateSettings } from '../base/settings';
import { getDeepLinkingPage } from '../deep-linking';
import { isSupportedBrowser } from '../base/environment';
import {
    reloadWithStoredParams
} from '../app';
import {
    BlankPage
} from '../welcome';
import {
    ADD_PREJOIN_AUDIO_TRACK,
    ADD_PREJOIN_VIDEO_TRACK,
    PREJOIN_START_CONFERENCE,
    PREJOIN_START_DESKTOP_CONFERENCE
} from './actionTypes';
import { setPrejoinAudioMuted, setPrejoinVideoMuted } from './actions';
import { getAllPrejoinConfiguredTracks } from './functions';

declare var APP: Object;
/**
 * Object describing application route.
 *
 * @typedef {Object} Route
 * @property {Component} component - React Component constructor.
 * @property {string|undefined} href - New location, in case navigation involves
 * a location change.
 */
export type Route = {
    component: Class < Component < * >> ,
    href: ? string
};
/**
 * The redux middleware for {@link PrejoinPage}.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => async action => {
    switch (action.type) {
    case ADD_PREJOIN_AUDIO_TRACK: {
        const { value: audioTrack } = action;

        if (audioTrack) {
            store.dispatch(
                    updateSettings({
                        micDeviceId: audioTrack.getDeviceId()
                    }),
            );
        }

        break;
    }

    case ADD_PREJOIN_VIDEO_TRACK: {
        const { value: videoTrack } = action;

        if (videoTrack) {
            store.dispatch(
                    updateSettings({
                        cameraDeviceId: videoTrack.getDeviceId()
                    }),
            );
        }

        break;
    }

    case PREJOIN_START_CONFERENCE: {
        const { getState, dispatch } = store;
        const state = getState();
        const { userSelectedSkipPrejoin } = state['features/prejoin'];

        userSelectedSkipPrejoin && dispatch(updateSettings({
            userSelectedSkipPrejoin
        }));

        const tracks = await getAllPrejoinConfiguredTracks(state);

        APP.conference.prejoinStart(tracks);

        break;
    }

    case PREJOIN_START_DESKTOP_CONFERENCE: {
        const { getState, dispatch } = store;
        const state = getState();
            const { userSelectedSkipPrejoin } = state['features/prejoin'];
            APP.store.dispatch(reloadWithStoredParams());
const route = _getEmptyRoute();

    // Update the location if it doesn't match. This happens when a room is
    // joined from the welcome page. The reason for doing this instead of using
    // the history API is that we want to load the config.js which takes the
    // room into account.
    const { locationURL } = state['features/base/connection'];

    if (window.location.href !== locationURL.href) {
        route.href = locationURL.href;

        return Promise.resolve(route);
    }
        userSelectedSkipPrejoin && dispatch(updateSettings({
            userSelectedSkipPrejoin
        }));

        return getDeepLinkingPage(state)
            .then(deepLinkComponent => {
                if (deepLinkComponent) {
                    route.component = deepLinkComponent;
                } else if (isSupportedBrowser()) {
                    route.component = Conference;
                } else {
                    route.component = UnsupportedDesktopBrowser;
                }
                            
                return route;
            });

        break;
    }
    case SET_AUDIO_MUTED: {
        store.dispatch(setPrejoinAudioMuted(Boolean(action.muted)));
        break;
    }

    case SET_VIDEO_MUTED: {
        store.dispatch(setPrejoinVideoMuted(Boolean(action.muted)));
        break;
    }

    }

    return next(action);
});
/**
 * Returns the default {@code Route}.
 *
 * @returns {Route}
 */
function _getEmptyRoute(): Route {
    return {
        component: BlankPage,
        href: undefined
    };
}
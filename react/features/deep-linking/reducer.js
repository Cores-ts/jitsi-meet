/* @flow */

import { ReducerRegistry } from '../base/redux';

import {
    OPEN_WEB_APP,
    OPEN_DESKTOP_APP
} from './actionTypes';

ReducerRegistry.register('features/deep-linking', (state = {}, action) => {
    switch (action.type) {
    case OPEN_WEB_APP: {
        return {
            ...state,
            launchInWeb: true
        };
    }
    case OPEN_DESKTOP_APP: {
        return {
            ...state,
            launchInWeb: false
        };
    }
    }

    return state;
});

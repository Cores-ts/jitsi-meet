// @flow

import Button, { ButtonGroup } from '@atlaskit/button';
import { AtlasKitThemeProvider } from '@atlaskit/theme';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import { createDeepLinkingPageEvent, sendAnalytics } from '../../analytics';
import { isSupportedBrowser } from '../../base/environment';
import { translate } from '../../base/i18n';
import { Platform } from '../../base/react';
import { connect } from '../../base/redux';
import {
    openWebApp,
    openDesktopApp
} from '../actions';
import { _TNS } from '../constants';

declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of
 * {@link DeepLinkingDesktopPage}.
 */
 type Props = {

    /**
     * Used to dispatch actions from the buttons.
     */
    dispatch: Dispatch<any>,

    /**
    * Application download URL.
    */
     _downloadUrl: ?string,
         
    /**
     * Used to obtain translations.
     */
    t: Function
};

/**
 * React component representing the deep linking page.
 *
 * @class DeepLinkingDesktopPage
 */
class DeepLinkingDesktopPage<P : Props> extends Component<P> {
    /**
     * Initializes a new {@code DeepLinkingDesktopPage} instance.
     *
     * @param {Object} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: P) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onLaunchWeb = this._onLaunchWeb.bind(this);
        this._onDownloadApp = this._onDownloadApp.bind(this);
        this._onTryAgain = this._onTryAgain.bind(this);
    }

    /**
     * Implements the Component's componentDidMount method.
     *
     * @inheritdoc
     */
    componentDidMount() {
        sendAnalytics(
            createDeepLinkingPageEvent(
                'displayed', 'DeepLinkingDesktop', { isMobileBrowser: false }));
    }

    /**
     * Renders the component.
     *
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;
        const { HIDE_DEEP_LINKING_LOGO, NATIVE_APP_NAME, SHOW_DEEP_LINKING_IMAGE } = interfaceConfig;
        const rightColumnStyle
            = SHOW_DEEP_LINKING_IMAGE ? null : { width: '100%' };
        
        return (

            // Enabling light theme because of the color of the buttons.
            <AtlasKitThemeProvider mode = 'light'>
                <div className = 'deep-linking-desktop'>
                    <div className = 'header'>
                        {
                            HIDE_DEEP_LINKING_LOGO
                                ? null
                                : <img
                                    className = 'logo'
                                    src = 'images/logo-deep-linking.png' />
                        }
                    </div>
                    <div className = 'content'>
                        {
                            SHOW_DEEP_LINKING_IMAGE
                                ? <div className = 'leftColumn'>
                                    <div className = 'leftColumnContent'>
                                        <div className = 'image' />
                                    </div>
                                </div> : null
                        }
                        <div
                            className = 'rightColumn'
                            style = { rightColumnStyle }>
                            <div className = 'rightColumnContent'>
                                <h1 className = 'title'>
                                    {
                                        t(`${_TNS}.title`,
                                        { app: NATIVE_APP_NAME })
                                    }
                                </h1>
                                <p className = 'description'>
                                    {
                                        t(
                                            `${_TNS}.${isSupportedBrowser()
                                                ? 'description'
                                                : 'descriptionWithoutWeb'}`,
                                            { app: NATIVE_APP_NAME }
                                        )
                                    }
                                </p>
                                <div className = 'buttons'>
                                    <ButtonGroup>
                                        <Button
                                            appearance = 'default'
                                            onClick = { this._onTryAgain }>
                                            { t(`${_TNS}.tryAgainButton`) }
                                        </Button>
                                        {
                                            isSupportedBrowser()
                                                && <Button onClick = { this._onLaunchWeb }>
                                                    { t(`${_TNS}.launchWebButton`) }
                                                </Button>
                                        }
                                    </ButtonGroup>
                                </div>
                                 {
                                     this._generateDownloadURL() &&
                                        <p className = 'download buttons'>
                                            { t(`${_TNS}.ifDoNotHaveApp`) }
                                                <a
                                                    href = { this._generateDownloadURL() }
                                                    onClick = { this._onDownloadApp }
                                                    target = '_blank'>
                                                        { t(`${_TNS}.downloadRunApp`) }
                                                </a>
                                        </p>
                                 }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </AtlasKitThemeProvider>
        );
    }

    /**
     * Generates the URL for downloading the app.
     *
     * @private
     * @returns {string} - The URL for downloading the app.
     */
    _generateDownloadURL() {
        const {
            _downloadUrl: url
        } = this.props;
        
        if (url) {
            return url;
        }

        return false;
    }

    _onDownloadApp: () => void;

    /**
     * Handles download app button clicks.
     *
     * @private
     * @returns {void}
     */
    _onDownloadApp() {
        sendAnalytics(
            createDeepLinkingPageEvent(
                'clicked', 'downloadAppButton', {
                    isMobileBrowser: false
                }));
    }

    _onTryAgain: () => void;

    /**
     * Handles try again button clicks.
     *
     * @returns {void}
     */
    _onTryAgain() {
        sendAnalytics(
            createDeepLinkingPageEvent(
                'clicked', 'tryAgainButton', { isMobileBrowser: false }));
        this.props.dispatch(openDesktopApp());
    }

    _onLaunchWeb: () => void;

    /**
     * Handles launch web button clicks.
     *
     * @returns {void}
     */
    _onLaunchWeb() {
        sendAnalytics(
            createDeepLinkingPageEvent(
                'clicked', 'launchWebButton', { isMobileBrowser: false }));
        this.props.dispatch(openWebApp());
    }
}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code DeepLinkingMobilePage} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        _downloadUrl: interfaceConfig[`DESKTOP_DOWNLOAD_LINK_${Platform.OS.toUpperCase()}`]
    };
}

export default translate(connect(_mapStateToProps)(DeepLinkingDesktopPage));

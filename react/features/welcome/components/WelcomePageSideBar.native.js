// @flow

import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text
} from 'react-native';

import { Avatar } from '../../base/avatar';
import { IconInfo, IconSettings } from '../../base/icons';
import {
    getLocalParticipant,
    getParticipantDisplayName
} from '../../base/participants';
import {
    Header,
    SlidingView
} from '../../base/react';
import { connect } from '../../base/redux';
import { setSettingsViewVisible } from '../../settings';

import { setSideBarVisible } from '../actions';
import SideBarItem from './SideBarItem';
import styles, { SIDEBAR_AVATAR_SIZE } from './styles';

import {
    authorize
} from 'react-native-app-auth';

import jitsiLocalStorage from '../../../../modules/util/JitsiLocalStorage';

/**
 * The URL at which the privacy policy is available to the user.
 */
const PRIVACY_URL = 'https://jitsi.org/meet/privacy';

/**
 * The URL at which the user may send feedback.
 */
const SEND_FEEDBACK_URL = 'mailto:support@jitsi.org';

/**
 * The URL at which the terms (of service/use) are available to the user.
 */
const TERMS_URL = 'https://jitsi.org/meet/terms';

type Props = {

    /**
     * Redux dispatch action
     */
    dispatch: Function,

    /**
     * Display name of the local participant.
     */
    _displayName: ?string,

    /**
     * ID of the local participant.
     */
    _localParticipantId: ?string,

    /**
     * Sets the side bar visible or hidden.
     */
    _visible: boolean
};

/**
 * A component rendering a welcome page sidebar.
 */
class WelcomePageSideBar extends Component<Props> {
    /**
     * Constructs a new SideBar instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onHideSideBar = this._onHideSideBar.bind(this);
        this._onOpenSettings = this._onOpenSettings.bind(this);
        this._onSignIn = this._onSignIn.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}, renders the sidebar.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <SlidingView
                onHide = { this._onHideSideBar }
                position = 'left'
                show = { this.props._visible }
                style = { styles.sideBar } >
                <Header style = { styles.sideBarHeader }>
                    <Avatar
                        participantId = { this.props._localParticipantId }
                        size = { SIDEBAR_AVATAR_SIZE } />
                    <Text style = { styles.displayName }>
                        { jitsiLocalStorage.getItem('user_displayName') || this.props._displayName }
                    </Text>
                </Header>
                <SafeAreaView style = { styles.sideBarBody }>
                    <ScrollView
                        style = { styles.itemContainer }>
                        <SideBarItem
                            icon = { IconSettings }
                            label = 'settings.title'
                            onPress = { this._onOpenSettings } />
                        <SideBarItem
                            icon = { IconInfo }
                            label = 'welcomepage.terms'
                            url = { TERMS_URL } />
                        <SideBarItem
                            icon = { IconInfo }
                            label = 'welcomepage.privacy'
                            url={ PRIVACY_URL } />
                        <SideBarItem
                            icon = { IconSettings }
                            label = 'Sign in'
                            onPress = { this._onSignIn } />
                    </ScrollView>
                </SafeAreaView>
            </SlidingView>
        );
    }

    _onHideSideBar: () => void;

    /**
     * Invoked when the sidebar has closed itself (e.g. Overlay pressed).
     *
     * @private
     * @returns {void}
     */
    _onHideSideBar() {
        this.props.dispatch(setSideBarVisible(false));
    }

    _onOpenSettings: () => void;

    /**
     * Shows the {@link SettingsView}.
     *
     * @private
     * @returns {void}
     */
    _onOpenSettings() {
        const { dispatch } = this.props;

        dispatch(setSideBarVisible(false));
        dispatch(setSettingsViewVisible(true));
    }

    _onSignIn: () => void;

    /**
     * Shows the {@link SettingsView}.
     *
     * @private
     * @returns {void}
     */
    _onSignIn() {

        const {
            dispatch
        } = this.props;

        // base config
        const configOauth = {
            clientId: '61kqrvroz2fexlyajdea',
            clientSecret: 'HO0PDYuFeWH71mBKUgpaeWFnXLKWvakRXAnf1Cq2CFogmeKI70C',
            redirectUrl: 'com.fundingbox.meetings://oauth',
            scopes: ['identity.profile'],
            useNonce: false,
            serviceConfiguration: {
                authorizationEndpoint: 'https://auth.fundingbox.com/authorize',
                tokenEndpoint: 'https://auth.fundingbox.com/token',
                identityEndpoint: 'https://auth.fundingbox.com/me'
            }
        };

        // use the client to make the auth request and receive the authState

        authorize(configOauth).then(result => {
            console.log('RESULTOAUTH', result, 'accessTOKENENENEN',
                          result
                          .accessToken);

            fetch(configOauth.serviceConfiguration.identityEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${result.accessToken}`
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }

                throw Error(res.statusText);

            }).then(json => {
                console.log(json);
                let user = {
                    id: json._id,
                    username: json.username,
                    displayName: json.profile.name.first
                }

                jitsiLocalStorage.setItem('user_id', json._id);
                jitsiLocalStorage.setItem('user_username', json.username);
                jitsiLocalStorage.setItem('user_displayName', `${json.profile.name.first} ${json.profile.name.last}` );

                console.log(jitsiLocalStorage.getItem('user_displayName'))
                //this.setState(json);
            })

        }).catch(error => console.error(error));

        // dispatch(setSideBarVisible(false));
        // dispatch(setSettingsViewVisible(true));

    }
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props.
 *
 * @param {Object} state - The redux state.
 * @protected
 * @returns {Props}
 */
function _mapStateToProps(state: Object) {
    const _localParticipant = getLocalParticipant(state);
    const _localParticipantId = _localParticipant?.id;
    const _displayName = _localParticipant && getParticipantDisplayName(state, _localParticipantId);

    return {
        _displayName,
        _localParticipantId,
        _visible: state['features/welcome'].sideBarVisible
    };
}

export default connect(_mapStateToProps)(WelcomePageSideBar);

// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import { connect } from '../../base/redux';

import { endRoomLockRequest } from '../actions';
import CodeInput from 'react-native-confirmation-code-input';
import { ColorPalette } from '../../base/styles';

/**
 * The style of the {@link TextInput} rendered by {@code RoomLockPrompt}. As it
 * requests the entry of a password, {@code TextInput} automatically correcting
 * the entry of the password is a pain to deal with as a user.
 */
const _TEXT_INPUT_PROPS = {
    codeLength: 6,
    keyboardType: 'default'
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: '100%',
        width:  '100%',
        position: 'absolute',
        backgroundColor: ColorPalette.blue
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    wrapper: {
        marginTop: '30%'
    },
    inputWrapper3: {
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    inputLabel3: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center'
    },
    cancelContainer: {
            textAlign: 'center',
            marginTop: 100,
        },
        cancel: {
            color: '#ffffff5f',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '800'
        }
});

/**
 * The type of the React {@code Component} props of {@link RoomLockPrompt}.
 */
type Props = {

    /**
     * The JitsiConference which requires a password.
     */
    conference: Object,

    /**
     * The number of digits to be used in the password.
     */
    passwordNumberOfDigits: ?number,

    /**
     * Redux store dispatch function.
     */
    dispatch: Dispatch<any>
};

/**
 * Implements a React Component which prompts the user for a password to lock  a
 * conference/room.
 */
class RoomLockPrompt extends Component<Props> {
    /**
     * Initializes a new RoomLockPrompt instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._validateInput = this._validateInput.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        let textInputProps = _TEXT_INPUT_PROPS;

        if (this.props.passwordNumberOfDigits) {
            textInputProps = {
                ...textInputProps,
                keyboardType: 'number-pad',
                codeLength: this.props.passwordNumberOfDigits
            };
        }

        /*
        return (
            <InputDialog
                contentKey = 'dialog.passwordLabel'
                onCancel = { this._onCancel }
                onSubmit = { this._onSubmit }
                textInputProps = { textInputProps }
                validateInput = { this._validateInput } />
            <View style={styles.titleWrapper}>
            <Text style={styles.title}>CODE INPUT DEMO</Text>
            </View>
            <CodeInput
                ref="codeInputRef"
                //secureTextEntry
                keyboardType="numeric"
                codeLength={6}
                className='border-circle'
                autoFocus={true}
                size={50}
                containerStyle={{ top: 30 }}
                codeInputStyle={{ fontWeight: '800' }}
                onFulfill={(code) => this._onFulfill(code)}/>
        );
        */
        
        return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
         
          <View style={styles.inputWrapper3}>
            <Text style={styles.inputLabel3}>Enter a {textInputProps.codeLength} characters PIN Code</Text>
            <CodeInput
                ref="codeInputRef"
                //secureTextEntry
                //keyboardType="number-pad"
                codeLength={textInputProps.codeLength}
                keyboardType={textInputProps.keyboardType}
                className = 'border-box'
                autoFocus={true}
                size={50}
                space={14}
                containerStyle={{ top: 30 }}
                codeInputStyle = {
                    {
                        fontWeight: '800',
                        fontSize: 22,
                        borderRadius: 5,
                        width: 40
                    }
                }
                onFulfill={(code) => this._onFulfill(code)}/>
                <TouchableHighlight style={styles.cancelContainer}
               
                onPress = { this._onCancel }>
                <Text style = { styles.cancel }>
                    Cancel
                </Text>
                
            </TouchableHighlight>
          </View>
        </ScrollView> 
      </View>
    );
    }

    _onFulfill(code) {
         this.props.dispatch(endRoomLockRequest(this.props.conference, code));

        this.refs.codeInputRef.clear();
         return true;
        }
   
    _onCancel: () => boolean;

    /**
     * Notifies this prompt that it has been dismissed by cancel.
     *
     * @private
     * @returns {boolean} True to hide this dialog/prompt; otherwise, false.
     */
    _onCancel() {
        // An undefined password is understood to cancel the request to lock the
        // conference/room.
        return this._onSubmit(undefined);
    }

    _onSubmit: (?string) => boolean;

    /**
     * Notifies this prompt that it has been dismissed by submitting a specific
     * value.
     *
     * @param {string|undefined} value - The submitted value.
     * @private
     * @returns {boolean} False because we do not want to hide this
     * dialog/prompt as the hiding will be handled inside endRoomLockRequest
     * after setting the password is resolved.
     */
    _onSubmit(value: ?string) {
        this.props.dispatch(endRoomLockRequest(this.props.conference, value));

        return false; // Do not hide.
    }

    _validateInput: (string) => boolean;

    /**
     * Verifies input in case only digits are required.
     *
     * @param {string|undefined} value - The submitted value.
     * @private
     * @returns {boolean} False when the value is not valid and True otherwise.
     */
    _validateInput(value: string) {

        // we want only digits, but both number-pad and numeric add ',' and '.' as symbols
        if (this.props.passwordNumberOfDigits
            && value.length > 0
            && !/^\d+$/.test(value)) {

            return false;
        }

        return true;
    }
}

export default connect()(RoomLockPrompt);

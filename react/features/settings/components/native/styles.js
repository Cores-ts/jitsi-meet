import { ColorPalette } from '../../../base/styles';

export const ANDROID_UNDERLINE_COLOR = 'transparent';
export const PLACEHOLDER_COLOR = ColorPalette.lightGrey;

const TEXT_SIZE = 17;

/**
 * The styles of the native components of the feature {@code settings}.
 */
export default {
    /**
     * Standardized style for a field container {@code View}.
     */
    fieldContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 65,
        paddingHorizontal: 15
    },

    /**
     * * Appended style for column layout fields.
     */
    fieldContainerColumn: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingVertical: 3
    },

    /**
     * Standard container for a {@code View} containing a field label.
     */
    fieldLabelContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 5,
        marginTop: 10
    },

    /**
     * Text of the field labels on the form.
     */
    fieldLabelText: {
        fontSize: TEXT_SIZE
    },

    /**
     * Appended style for column layout fields.
     */
    fieldLabelTextColumn: {
        fontSize: 12
    },

    /**
     * Field container style for all but last row {@code View}.
     */
    fieldSeparator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)'
    },

    /**
     * Style for the {@code View} containing each
     * field values (the actual field).
     */
    fieldValueContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    /**
     * Style fo the form section separator titles.
     */
    formSectionTitle: {
        padding: 5,
        paddingLeft: 15,
        marginTop: 40
    },

    formSectionTitleText: {
        color: '#ffffff60',
        fontSize: 18,
        fontWeight: '900'
    },

    settingsForm: {
        backgroundColor: ColorPalette.blue,
        flex: 1
    },

    /**
     * Global {@code Text} color for the components.
     */
    text: {
        color: ColorPalette.white
    },

    /**
     * Standard text input field style.
     */
    textInputField: {
        color: '#ffffff60',
        flex: 1,
        fontSize: TEXT_SIZE,
        textAlign: 'right',
        minHeight: 40
    },

    /**
     * Appended style for column layout fields.
     */
    textInputFieldColumn: {
        backgroundColor: '#00000040',
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 3,
        paddingHorizontal: 8,
        textAlign: 'left'
    }
};

// @flow

import { BoxModel, ColorPalette } from '../../../styles';
import { Dimensions } from "react-native";

const OVERLAY_FONT_COLOR = 'rgba(255, 255, 255, 0.9)';
const SECONDARY_ACTION_BUTTON_SIZE = 30;
const iconPosition = Math.round(Dimensions.get('window').width/2) - 55;

export const AVATAR_SIZE = 65;
export const UNDERLAY_COLOR = 'rgba(255, 255, 255, 0.2)';

/**
 * Style classes of the PagedList-based components.
 */
const PAGED_LIST_STYLES = {

    /**
     * Outermost container of a page in {@code PagedList}.
     */
    pageContainer: {
        flex: 1
    },

    /**
     * Style of the page indicator (Android).
     */
    pageIndicator: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: BoxModel.padding / 2,
        backgroundColor: 'transparent',
        borderRadius: 10,
        width: 45,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 0,
        borderColor: '#fff'
    },

    /**
     * Additional style for the active indicator icon (Android).
     */
    pageIndicatorActive: {
        backgroundColor: '#713dec'
    },

    /**
     * Additional style for the active indicator icon (Android).
     */
    pageIndicatorPlus: {
        backgroundColor: '#713dec',
        width: 80,
        height: 80,
        borderRadius: 50
    },

    /**
     * Container for the page indicators (Android).
     */
    pageIndicatorContainer: {
        alignItems: 'center',
        backgroundColor: ColorPalette.blue,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 100,
        position: 'absolute',
        margin: 0,
        bottom: 20,
        left: 10,
        right: 10,
        height: 60
    },

    pageIndicatorContent: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    /**
     * Icon of the page indicator (Android).
     */
    pageIndicatorIcon: {
        color: '#fff',
        fontSize: 30
    },

    /**
     * Label of the page indicator (Android).
     */
    pageIndicatorText: {
        color: ColorPalette.blueHighlight,
        display: 'none'
    },

    /**
     * Top level style of the paged list.
     */
    pagedList: {
        flex: 1
    },

    /**
     * The paged list container View.
     */
    pagedListContainer: {
        flex: 1,
        flexDirection: 'column'
    },

    /**
     * Disabled style for the container.
     */
    pagedListContainerDisabled: {
        opacity: 0.2
    }
};

const SECTION_LIST_STYLES = {
    /**
     * The style of the avatar container that makes the avatar rounded.
     */
    avatarContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5
    },

    /**
     * Simple {@code Text} content of the avatar (the actual initials).
     */
    avatarContent: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: OVERLAY_FONT_COLOR,
        fontSize: Math.floor(AVATAR_SIZE / 2),
        fontWeight: '100',
        textAlign: 'center'
    },

    /**
     * The top level container style of the list.
     */
    container: {
        flex: 1,
    },

    list: {
        flex: 1,
        flexDirection: 'column'
    },

    listItem: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 5,
        borderLeftWidth: 4,
        borderLeftColor: '#4342ff',
        backgroundColor: '#00000030'
    },

    lastListItem: {
        marginBottom: 100
    },

    listItemDetails: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
        paddingHorizontal: 5
    },

    listItemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        marginLeft: 10
    },

    listItemTitle: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },

    listSection: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    listSectionText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '800',
        marginTop: 40
    },

    pullToRefresh: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },

    pullToRefreshIcon: {
        backgroundColor: 'transparent',
        color: OVERLAY_FONT_COLOR,
        fontSize: 20
    },

    pullToRefreshText: {
        color: OVERLAY_FONT_COLOR,
        fontWeight: '600'
    },

    secondaryActionContainer: {
        alignItems: 'center',
        backgroundColor: ColorPalette.blue,
        borderRadius: 3,
        height: SECONDARY_ACTION_BUTTON_SIZE,
        justifyContent: 'center',
        margin: BoxModel.margin * 0.5,
        marginRight: BoxModel.margin,
        width: SECONDARY_ACTION_BUTTON_SIZE
    },

    secondaryActionLabel: {
        color: ColorPalette.white
    },

    touchableView: {
        flexDirection: 'row'
    }
};

export const TINTED_VIEW_DEFAULT = {
    backgroundColor: ColorPalette.appBackground,
    opacity: 0.8
};

/**
 * The styles of the generic React {@code Component}s implemented by the feature
 * base/react.
 */
export default {
    ...PAGED_LIST_STYLES,
    ...SECTION_LIST_STYLES
};

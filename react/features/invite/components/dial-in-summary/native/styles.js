// @flow

import { ColorPalette } from '../../../../base/styles';
import { Dimensions } from 'react-native';

const panelHeight = Dimensions.get('window').height - 125;
export const INDICATOR_COLOR = ColorPalette.lightGrey;

export default {

    bar: {
        
    },
    
    indicatorWrapper: {
        alignItems: 'center',
        backgroundColor: ColorPalette.white,
        height: panelHeight,
        justifyContent: 'center'
    },

    webView: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
        bottom: 0
    },

    webViewWrapper: {
        flex: 1,
        flexDirection: 'column',
        height: panelHeight
    }
};

// @flow

import React, { Component } from 'react';

import Container from './Container';
import styles from './styles';
import Text from './Text';
import type { SetionListSection } from '../../Types';

type Props = {

    /**
     * A section containing the data to be rendered
     */
    section: SetionListSection
}

/**
 * Implements a React/Native {@link Component} that renders the section header
 * of the list
 *
 * @extends Component
 */
export default class NavigateSectionListSectionHeader extends Component<Props> {
    /**
     * Renders the content of this component.
     *
     * @returns {ReactElement}
     */
    render() {
        const { section } = this.props.section;

        return (
            <Container style = { styles.listSection }>
                <Text style = { styles.listSectionText }>
                    { this._capitalize(section.title) }
                </Text>
            </Container>
        );
    }

    _capitalize: (string) => string;

    /**
     * Capitalizes the first letter.
     *
     * @param {string} str - The text to convert.
     * @private
     * @returns {string} The modified string.
     */
    _capitalize(str: string) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
}

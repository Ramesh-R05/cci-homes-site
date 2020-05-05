import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert } from '@bxm/shared-ui';

export default class SiteAlert extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
    }

    onCloseHandler = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

    static propTypes = {
        styles: PropTypes.object,
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        modifier: PropTypes.string,
        link: PropTypes.string
    };

    static defaultProps = {
        primaryText: '',
        secondaryText: '',
        link: '',
        modifier: '',
        styles: {
            textColor: '#ffffff',
            backgroundColor: '#031424',
            buttonColor: '#ffffff',
            backgroundImage: ''
        }
    };

    render() {
        const { styles, primaryText, secondaryText, link, modifier } = this.props;
        const { isOpen } = this.state;

        return (
            <Alert
                styles={styles}
                primaryText={primaryText}
                secondaryText={secondaryText}
                linkGtmClass="gtm-site-alert-logies-2019"
                modifier={modifier}
                link={link}
                isDisplayed={isOpen}
                onCloseHandler={this.onCloseHandler}
                onKeyDown={this.onCloseHandler}
            />
        );
    }
}

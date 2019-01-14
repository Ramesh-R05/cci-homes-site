import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

export default class Uniheader extends Component {
    static displayName = 'Uniheader';

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const {
            config: {
                brands: { uniheader }
            }
        } = this.context;

        const classes = {
            root: cx('uniheader', 'show-for-medium-up'),
            nav: cx('uniheader__nav', 'container')
        };

        // TODO - remove slice when new brands go live
        const uniheaderLogos = uniheader.slice(0, 6).map((item, i) => {
            const { id, title, url, imageUrl } = item;
            const key = `uniheader-item-${i}`;

            return (
                <li key={key}>
                    <a href={url} title={title} className={`gtm-uniheader-${id}`}>
                        <img src={imageUrl} alt={title} className={`uniheader__logo--${id}`} />
                    </a>
                </li>
            );
        });

        return (
            <header className={classes.root}>
                <nav className={classes.nav}>{uniheaderLogos}</nav>
            </header>
        );
    }
}

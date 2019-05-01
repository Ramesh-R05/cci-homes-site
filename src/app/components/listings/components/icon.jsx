import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InlineSVG from 'react-inlinesvg';
import classNames from 'classnames';

export default class Icon extends Component {
    static displayName = 'Icon';

    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render() {
        const { name } = this.props;

        if (!name) {
            return null;
        }

        const src = `/assets/icons/listings/${name}.svg`;
        const image = <img src={src} alt="" />;
        const inlineSvg = <InlineSVG src={src}>{image}</InlineSVG>;
        const rootClass = classNames('icon', {
            [`icon--${name}`]: name
        });

        return (
            <i className={rootClass}>
                <span className="social-icon__icon">{inlineSvg}</span>
            </i>
        );
    }
}

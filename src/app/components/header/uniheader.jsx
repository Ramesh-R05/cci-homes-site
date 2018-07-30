import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Uniheader extends Component {
    static displayName = 'Uniheader';

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { config } = this.context;
        const uniheaderBrands = config.brands.uniheader;
        const uniheaderClassName = 'uniheader';
        const uniheaderOuterClasses = cx(uniheaderClassName, 'show-for-medium-up');
        const uniheaderContainerClasses = cx(`${uniheaderClassName}__nav`, 'container');
        // TODO - remove slice when new brands go live
        const uniheaderLogos = uniheaderBrands.slice(0, 6).map((item, i) => {
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
            <header className={uniheaderOuterClasses}>
                <nav className={uniheaderContainerClasses}>{uniheaderLogos}</nav>
            </header>
        );
    }
}

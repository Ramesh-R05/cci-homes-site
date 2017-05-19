import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Uniheader extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const uniheaderBrands = this.context.config.brands.uniheader;
        const uniheaderClassName = 'uniheader';
        const uniheaderOuterClasses = cx(uniheaderClassName, 'show-for-medium-up');
        const uniheaderContainerClasses = cx(`${uniheaderClassName}__nav`, 'container');
        const uniheaderLogos = uniheaderBrands.map(
            (item, i) => {
                const { id, title, url, imageUrl } = item;
                return (
                    <li key={i}>
                        <a href={url} title={title} className={`gtm-uniheader-${id}`}>
                            <img src={imageUrl} alt={title} className={`uniheader__logo--${id}`} />
                        </a>
                    </li>
                );
            }
        );

        return (
            <header className={uniheaderOuterClasses}>
                <nav className={uniheaderContainerClasses}>
                    {uniheaderLogos}
                </nav>
            </header>
        );
    }
}

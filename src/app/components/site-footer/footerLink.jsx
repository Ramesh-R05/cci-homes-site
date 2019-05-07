import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function FooterLink({ url, gtmClass, title, target, classModifier }) {
    if (!title || !url || !gtmClass) {
        return null;
    }

    const rootClass = classNames('footer-link', { [`footer-link--${classModifier}`]: classModifier });
    const anchorClass = classNames('footer-link__anchor', gtmClass);

    return (
        <li className={rootClass}>
            <a className={anchorClass} href={url} target={target}>
                {title}
            </a>
        </li>
    );
}

FooterLink.displayName = 'FooterLink';

FooterLink.propTypes = {
    url: PropTypes.string.isRequired,
    gtmClass: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    target: PropTypes.string,
    classModifier: PropTypes.string
};

FooterLink.defaultProps = {
    target: '_self',
    classModifier: ''
};

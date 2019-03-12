import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function FooterColumn({ children, titleText, renderChildrenInList, classModifier, spanSmall, spanMedium, spanLarge, spanxLarge }) {
    if (!children) {
        return null;
    }

    const rootClass = classNames('footer-column', 'columns', {
        [`footer-column--${classModifier}`]: classModifier,
        [`small-${spanSmall}`]: spanSmall,
        [`medium-${spanMedium}`]: spanMedium,
        [`large-${spanLarge}`]: spanLarge,
        [`xLarge-${spanxLarge}`]: spanxLarge
    });

    return (
        <div className={rootClass}>
            {titleText && <h2 className="footer-column__title">{titleText}</h2>}
            {renderChildrenInList ? <ul className="footer-column__list">{children}</ul> : <div className="footer-column__inner">{children}</div>}
        </div>
    );
}

FooterColumn.displayName = 'FooterColumn';

FooterColumn.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
    titleText: PropTypes.string,
    renderChildrenInList: PropTypes.bool,
    classModifier: PropTypes.string,
    spanSmall: PropTypes.number,
    spanMedium: PropTypes.number,
    spanLarge: PropTypes.number,
    spanxLarge: PropTypes.number
};

FooterColumn.defaultProps = {
    titleText: null,
    renderChildrenInList: false,
    classModifier: null,
    spanSmall: null,
    spanMedium: null,
    spanLarge: null,
    spanxLarge: null
};

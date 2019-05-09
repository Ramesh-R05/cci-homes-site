import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// const styles = require('./summary.module.scss');
import styles from './summary.module.scss';

console.log(styles);

console.log(styles.Article2);

export default function Summary({ streetAddress, subheading, copy }) {
    return (
        <div className={classNames('summary', styles.Article2)}>
            <p className="summary__address">{streetAddress}</p>
            <p className="summary__sub-heading">{subheading}</p>
            <p className="summary__copy">{copy}</p>
        </div>
    );
}

Summary.displayName = 'Summary';

Summary.propTypes = {
    streetAddress: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired
};

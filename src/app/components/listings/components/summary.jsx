import React from 'react';
import PropTypes from 'prop-types';
import { splitParagraphs } from '@bxm/markdown';
import splitParagraphsHTML from '../utilities/splitParagraphsHTML';

export default function Summary({ streetAddress, subheading, copy }) {
    return (
        <div className="summary">
            <p className="summary__address">{streetAddress}</p>
            <p className="summary__sub-heading">{subheading}</p>
            <p className="summary__copy" dangerouslySetInnerHTML={{ __html: splitParagraphsHTML(splitParagraphs(copy)) }} />
        </div>
    );
}

Summary.displayName = 'Summary';

Summary.propTypes = {
    streetAddress: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired
};

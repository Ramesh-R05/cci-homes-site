import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SocialIcon from '@bxm/social/lib/components/socialIcons/socialIcon';

export default function SocialIcons({ links, isVertical }) {
    if (!links) {
        return null;
    }

    const rootClass = classNames('social-icons', {
        'social-icons--vertical': isVertical
    });

    return (
        <div className={rootClass}>
            {links.map((link, i) => {
                const key = `social-links-${i}`;

                return <SocialIcon key={key} {...link} />;
            })}
        </div>
    );
}

SocialIcons.displayName = 'SocialIcons';

SocialIcons.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string
        })
    ).isRequired,
    isVertical: PropTypes.bool
};

SocialIcons.defaultProps = {
    isVertical: false
};

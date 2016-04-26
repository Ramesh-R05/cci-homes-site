import React, { PropTypes } from 'react';

export const SponsorsLinks = (props) => {
    const { by, displayTextOnly, classNameModify, expanded } = props;
    const className = classNameModify ? `header-sponsors header-sponsors${classNameModify}` : 'header-sponsors';
    const sponsors = [
        {
            brandName: 'belle',
            text: 'belle',
            url: '/belle/'
        },
        {
            brandName: 'realliving_black',
            text: 'real living',
            url: '/real-living/'
        },
        {
            brandName: 'homesplus',
            text: 'homes+',
            url: '/homes-plus/'
        },
        {
            brandName: 'housegarden',
            text: 'house & garden',
            url: '/australian-house-and-garden/'
        }
    ];

    return (
        <div className={!expanded ? 'header__sections' : ''}>
            <div className={className}>
                <ul>
                    <li className="header-sponsors--by">{by.toUpperCase()}</li>
                    {sponsors.map((sponsor, i) => {
                        return (<li key={i}>
                            <a href={sponsor.url}>
                                {displayTextOnly ?
                                    <span className={`header-sponsors__logo--${sponsor.brandName}`}>{sponsor.text.toUpperCase()}</span> :
                                    <img className={`header-sponsors__logo--${sponsor.brandName}`} src={`/assets/svgs/${sponsor.brandName}.svg`} alt={`${sponsor.brandName} logo`} /> }
                            </a>
                        </li>);
                    })}
                </ul>
            </div>
        </div>
    );
};

SponsorsLinks.propTypes = {
    displayTextOnly: PropTypes.bool,
    by: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    classNameModify: PropTypes.string
};

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SponsorHeader from '@bxm/ad/lib/polar/components/sponsor/header';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

export default class Header extends Component {
    static displayName = 'SectionHeader';

    static propTypes = {
        title: PropTypes.string.isRequired,
        splitTitle: PropTypes.bool,
        sponsorName: PropTypes.string
    };

    static defaultProps = {
        splitTitle: true,
        sponsorName: null
    };

    render() {
        const { title, splitTitle, sponsorName } = this.props;

        if (!title) {
            return null;
        }

        let htmlHeading;
        const words = title.match(/\S+/g);

        if (!splitTitle || words.length === 1) {
            htmlHeading = (
                <h1>
                    <b>{title}</b>
                </h1>
            );
        } else {
            htmlHeading = (
                <h1>
                    {words.map((word, i) => {
                        const key = `heading-word-${i}`;

                        if (i % 2 === 0) {
                            return <span key={key}>{word}</span>;
                        }

                        return <b key={key}> {word} </b>;
                    })}
                </h1>
            );
        }

        const pageLocation = Ad.pos.outside;
        const stickyAdProps = {
            className: 'ad--section-top-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation
        };

        return (
            <div className="section__heading">
                <div className="section__heading-ad">
                    <StickyAd
                        adProps={stickyAdProps}
                        minHeight={450}
                        stickyAtViewPort="xlargeRangeMax"
                        stickyDelay={2000}
                        isStickyTemporary
                        stickyDuration={3500}
                    />
                </div>

                <div className="section__heading-title">
                    {!sponsorName ? (
                        htmlHeading
                    ) : (
                        <SponsorHeader id={sponsorName} title={<b>{title}</b>}>
                            {htmlHeading}
                        </SponsorHeader>
                    )}
                </div>
            </div>
        );
    }
}

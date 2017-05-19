import React, { Component, PropTypes } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Header extends Component {

    static propTypes = {
        title: PropTypes.string,
        logo: PropTypes.string.isRequired
    };

    render() {
        const { title, logo } = this.props;

        if (!logo) return null;

        return (
            <div className="section__heading">
                <div className="section__heading__ad">
                    <Ad
                      className="ad--section-top-leaderboard"
                      sizes={{
                          small: 'banner',
                          leaderboard: 'leaderboard',
                          billboard: ['billboard', 'leaderboard']
                      }}
                      targets={{ position: 1 }}
                      label={{ active: false }}
                    />
                </div>
                <div className="brand__wrapper">
                    <h1 className="brand__logo">
                        <img src={logo} alt={title} />
                    </h1>
                </div>
            </div>
        );
    }
}

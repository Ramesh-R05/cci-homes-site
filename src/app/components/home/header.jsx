import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class HomeHeader extends Component {
    render() {
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
                        targets={{position: 1}}
                        label={{active: false}}
                    />
                </div>
            </div>

        )
    }
}

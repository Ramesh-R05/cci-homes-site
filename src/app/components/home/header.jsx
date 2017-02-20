import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class HomeHeader extends Component {
    render() {
        return (
            <div className="columns small-12">
                <Ad
                    className="ad--section-top-leaderboard"
                    sizes={{
                        small: 'banner',
                        leaderboard: 'leaderboard',
                        billboard: ['billboard', 'leaderboard']
                    }}
                    targets={{position: 1}}
                />
            </div>
        )
    }
}

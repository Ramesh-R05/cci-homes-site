import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class HomeHeader extends Component {
    render() {
        return (
            <Ad
                className="ad--section-top-leaderboard"
                sizes={{
                    small: 'banner',
                    medium: 'leaderboard',
                    large: ['billboard', 'leaderboard']
                }}
                targets={{position: 1}}
            />
        )
    }
}

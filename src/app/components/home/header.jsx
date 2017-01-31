import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class HomeHeader extends Component {
    render() {
        return (
            <div className="columns small-12">
                <Ad
                    className="ad--section-top-leaderboard"
                    displayFor={['small', 'medium', 'large', 'xlarge']}
                    sizes={{
                        small: 'banner',
                        medium: 'leaderboard',
                        large: ['billboard', 'leaderboard']
                    }}
                    targets={{position: 1}}
                />
            </div>
        )
    }
}

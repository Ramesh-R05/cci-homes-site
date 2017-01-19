import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Header extends Component {

    static propTypes = {
        title: PropTypes.string,
        logo: PropTypes.string.isRequired
    };

    render() {
        const {title, logo} = this.props;

        if (!logo) return null;

        return (
            <div className="columns small-12">
                <Ad
                    className="ad--section-top-leaderboard"
                    sizes={{
                        small: 'banner',
                        medium: 'leaderboard',
                        large: ['billboard', 'leaderboard']
                    }}
                    targets={{position: 1}}
                />
                <div className="brand__logo">
                    <img src={logo} alt={title} />
                </div>
            </div>
        );
    }
}

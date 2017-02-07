import React, { PropTypes, Component } from 'react';
import SocialLinks from './socialLinks';

export default class SocialContainer extends Component {

    static displayName = 'Social';

    static PropTypes = {
        socialUrls: PropTypes.object
    };

    static defaultProps = {
        socialUrls: {
            facebook: 'https://www.facebook.com/homestoloveau',
            twitter: 'https://twitter.com/homestoloveau',
            instagram: 'https://www.instagram.com/homestoloveau',
            pinterest: 'https://www.pinterest.com/homestoloveau'
        }
    };

    render() {
        const { facebook, twitter, instagram, pinterest } = this.props.socialUrls;
        const links = [
            {
                name: 'facebook',
                url: facebook
            },
            {
                name: 'twitter',
                url: twitter
            },
            {
                name: 'instagram',
                url: instagram
            },
            {
                name: 'pinterest',
                url: pinterest
            }
        ];

        return (<SocialLinks links={links} />);
    }
}

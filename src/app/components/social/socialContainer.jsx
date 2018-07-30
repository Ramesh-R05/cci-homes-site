import React, { PropTypes, Component } from 'react';
import SocialLinks from './socialLinks';

export default class SocialContainer extends Component {
    static displayName = 'Social';

    static propTypes = {
        socialUrls: PropTypes.object,
        title: PropTypes.string,
        gtmClass: PropTypes.string,
        nodeType: PropTypes.string
    };

    static defaultProps = {
        socialUrls: {
            facebook: 'https://www.facebook.com/homestoloveau',
            twitter: 'https://twitter.com/homestoloveau',
            instagram: 'https://www.instagram.com/homestoloveau',
            pinterest: 'https://www.pinterest.com/homestoloveau'
        },
        title: 'Homes To Love',
        gtmClass: 'gtm-follow-homepage',
        nodeType: null
    };

    render() {
        const { nodeType, title, socialUrls } = this.props;
        const {
            facebook, twitter, instagram, pinterest
        } = socialUrls;
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

        return (<SocialLinks links={links} nodeType={nodeType} title={title} {...this.props} />);
    }
}

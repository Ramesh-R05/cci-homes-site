import React, {Component, PropTypes} from 'react';
import has from 'lodash/object/has';

const LOGO_PATH = '/assets/images/source';

export default class Credits extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    static sourceMetadata = {
        'homes+': {
            pageUrl: 'http://www.homestolove.com.au/homes-plus/',
            logo: 'homes.svg'
        },
        'real living': {
            pageUrl: 'http://www.homestolove.com.au/real-living/',
            logo: 'real-living.svg'
        },
        'Belle': {
            pageUrl: 'http://www.homestolove.com.au/belle/',
            logo: 'belle.svg'
        },
        'Australian House and Garden': {
            pageUrl: 'http://www.homestolove.com.au/house-and-garden/',
            logo: 'australian-house-and-garden.svg'
        },
        'Homes To Love': {
            pageUrl: 'http://www.homestolove.com.au',
            logo: 'homes-to-love.svg'
        }
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (!this.props.source || !has(Credits.sourceMetadata, this.props.source)) {
            return null;
        }
        const sourceMeta = Credits.sourceMetadata[this.props.source];
        const pageUrl = sourceMeta.pageUrl;
        const imageUrl = `${LOGO_PATH}/${sourceMeta.logo}`;
        return (
            <div className="article__source">
                <span>Article By</span>
                <a href={pageUrl}>
                    <img src={imageUrl} alt={this.props.source}/>
                </a>
            </div>
        );
    }

}

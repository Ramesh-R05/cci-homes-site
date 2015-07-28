import React, {Component, PropTypes} from 'react';
import * as sourceUtils from '../../utils/sourceUtils';

const IMG_PATH = '/assets/images/source';

export default class Credits extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    static sourceToUrlMap = {
        'homes': 'http://www.homestolove.com.au/homes-plus/',
        'real-living': 'http://www.homestolove.com.au/real-living/',
        'belle': 'http://www.homestolove.com.au/belle/',
        'australian-house-and-garden': 'http://www.homestolove.com.au/house-and-garden/'
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const source = this.props.source;
        if (!source) return null;

        const cleanSource = sourceUtils.normalise(source);
        const imageUrl = `${IMG_PATH}/${cleanSource}.svg`;
        const pageUrl = Credits.sourceToUrlMap[cleanSource];

        let logo;
        if (pageUrl) {
            logo = <a href={pageUrl}><img src={imageUrl} alt={source}/></a>;
        } else {
            logo = <img src={imageUrl} alt={source} />;
        }

        return (
            <div className="article__source">
                <span>Article By</span>
                {logo}
            </div>
        );
    }

}

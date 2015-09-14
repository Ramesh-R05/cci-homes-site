import React, {Component, PropTypes} from 'react';
import BrandLink from '../brand/link';

const LOGO_PATH = '/assets/images/source';

export default class Credits extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    static sourceLogos = {
        'homes+': 'homes.svg',
        'real living': 'real-living.svg',
        'belle': 'belle.svg',
        'australian house and garden': 'australian-house-and-garden.svg',
        'homes to love': 'homes-to-love.svg'
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {source} = this.props;

        if (!source || !Credits.sourceLogos[source.toLowerCase()]) {
            return null;
        }
        const sourceLogo = Credits.sourceLogos[source.toLowerCase()];
        const imageUrl = `${LOGO_PATH}/${sourceLogo}`;
        return (
            <div className="article__source">
                <span>Article By</span>
                <BrandLink source={source}>
                    <img src={imageUrl} alt={source}/>
                </BrandLink>
            </div>
        );
    }

}

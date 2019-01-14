import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BrandLink from '../brand/link';

const LOGO_PATH = '/assets/images/source';

export default class ArticleSource extends Component {
    static displayName = 'ArticleSource';

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { source } = this.props;
        const { config } = this.context;

        const sourceLogo = source ? config.get(`article.sources.${source.toLowerCase()}.logo`) : '';

        if (!source || !sourceLogo) {
            return null;
        }

        const imageUrl = `${LOGO_PATH}/${sourceLogo}`;

        return (
            <div className="article__source">
                <span>Article By</span>
                <BrandLink source={source}>
                    <img src={imageUrl} alt={source} />
                </BrandLink>
            </div>
        );
    }
}

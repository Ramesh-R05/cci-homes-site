import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import BrandLink from '../brand/link';

const LOGO_PATH = '/assets/images/source';
export default class Source extends Component {
    static displayName = 'TeaserSource';

    static propTypes = {
        source: PropTypes.string.isRequired,
        dateCreated: PropTypes.string
    };

    static defaultProps = {
        dateCreated: ''
    };

    static contextTypes = {
        config: PropTypes.object
    };

    ellipseDateHTML = creationDate => ({ __html: `&bull; ${creationDate}` });

    render() {
        const { source, dateCreated } = this.props;
        const { config } = this.context;

        if (!source) {
            return null;
        }

        const sourceLogo = source ? config.get(`article.sources.${source.toLowerCase()}.logo`) : '';
        const date = moment(dateCreated).format('DD MMM YYYY');

        let imageUrl = '';

        if (sourceLogo) {
            imageUrl = `${LOGO_PATH}/${sourceLogo}`;
        }

        const brandImage = imageUrl ? <img className="teaser__source-image" alt={source} src={imageUrl} /> : null;

        return (
            <div className="teaser__source">
                <BrandLink linkSiteBrand={false} source={source}>
                    <span className="icon-source" />
                    <span className="teaser__source-item">
                        {brandImage}
                        {dateCreated && <div className="teaser__source-timestamp" dangerouslySetInnerHTML={this.ellipseDateHTML(date)} />}
                    </span>
                </BrandLink>
            </div>
        );
    }
}

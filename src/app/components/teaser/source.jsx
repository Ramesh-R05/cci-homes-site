import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BrandLink from '../brand/link';

export default class Source extends Component {
    static displayName = 'TeaserSource';

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    render() {
        const { source } = this.props;

        if (!source) {
            return null;
        }

        return (
            <div className="teaser__source">
                <BrandLink linkSiteBrand={false} source={source}>
                    <span className="icon-source" />
                    {source}
                </BrandLink>
            </div>
        );
    }
}

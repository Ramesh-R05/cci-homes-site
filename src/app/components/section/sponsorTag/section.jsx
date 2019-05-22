import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GenericSection from '../section';
import WithLoadMore from '../../helpers/withLoadMore';

export class SponsorTagSection extends Component {
    static displayName = 'SponsorTagSection';

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: []
    };

    render() {
        return <GenericSection {...this.props} />;
    }
}

export default WithLoadMore(SponsorTagSection);

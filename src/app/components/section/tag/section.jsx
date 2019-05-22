import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GenericSection from '../section';
import WithLoadMore from '../../helpers/withLoadMore';

export class TagSection extends Component {
    static displayName = 'TagSection';

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        navigationTags: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        navigationTags: []
    };

    render() {
        return <GenericSection {...this.props} />;
    }
}

export default WithLoadMore(TagSection);

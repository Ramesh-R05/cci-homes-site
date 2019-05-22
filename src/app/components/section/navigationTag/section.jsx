import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GenericSection from '../section';
import WithLoadMore from '../../helpers/withLoadMore';

export class NavigationTagSection extends Component {
    static displayName = 'NavigationTagSection';

    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object),
        content: PropTypes.object.isRequired,
        galleries: PropTypes.array,
        hero: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        galleries: [],
        hero: {}
    };

    render() {
        return <GenericSection {...this.props} />;
    }
}

export default WithLoadMore(NavigationTagSection);

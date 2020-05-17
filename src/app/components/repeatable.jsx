import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class Repeatable extends Component {
    static displayName = 'Repeatable';

    static propTypes = {
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Component)]).isRequired,
        action: PropTypes.func.isRequired,
        dataSource: PropTypes.object.isRequired,
        nextParams: PropTypes.object.isRequired,
        gtmClass: PropTypes.string
    };

    static defaultProps = {
        gtmClass: null
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);

        this.state = { isLoading: false };
    }

    onLoadMore = () => {
        const { executeAction } = this.context;
        const { isLoading } = this.state;
        const { action, nextParams } = this.props;

        if (isLoading) {
            return;
        }

        executeAction(action, nextParams);
        this.setState({ isLoading: true });
    };

    componentWillReceiveProps() {
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        const { action, component: ChildComponent, dataSource, nextParams, ...otherProps } = this.props;
        const { items } = dataSource;

        if (!items || items.length === 0) {
            return null;
        }

        const repeatableComponents = items.map((item, i) => <ChildComponent key={item.id || i} index={i} items={item} {...otherProps} />);

        const prevUrl = dataSource.previous && dataSource.previous.path;
        const nextUrl = dataSource.next && dataSource.next.path;
        const prevProps = {};
        const nextProps = {};
        let loadMore = null;

        if (prevUrl) {
            prevProps.href = prevUrl;
            prevProps.className = classNames('button button--link', {
                disabled: prevUrl === null
            });
        }

        if (nextUrl) {
            nextProps.href = nextUrl;
            nextProps.className = classNames('button button--link', {
                disabled: nextUrl === null
            });
            loadMore = (
                <div className="load-more">
                    <button type="button" className="button gtm-loadmore-button" onClick={this.onLoadMore}>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            );
        }

        return (
            <div className="repeatable-component">
                {repeatableComponents}
                <div className="container">
                    <div className="row">
                        {loadMore}
                        <div className="pagination">
                            {prevUrl && <a {...prevProps}>Previous</a>}
                            {nextUrl && <a {...nextProps}>Next</a>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class Repeatable extends Component {

    static displayName = 'Repeatable';

    static propTypes = {
        component: PropTypes.instanceOf(Component).isRequired,
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
        if (this.state.isLoading) return;

        this.context.executeAction(this.props.action, this.props.nextParams);
        this.setState({ isLoading: true });
    };

    componentWillReceiveProps() {
        this.setState({ isLoading: false });
    }

    render() {
        const {
            action,
            component: ChildComponent,
            dataSource,
            nextParams,
            ...otherProps
        } = this.props;

        const items = dataSource.items;

        if (!items || items.length === 0) return null;

        const repeatableComponents = items.map((item, i) => (
            <ChildComponent key={item.id || i} index={i} items={item} {...otherProps} />
            ));

        const prevUrl = dataSource.previous && dataSource.previous.path;
        const prevProps = {
            href: prevUrl,
            className: classNames('button button--link', {
                disabled: prevUrl == null
            })
        };
        const nextUrl = dataSource.next && dataSource.next.path;
        const nextProps = {
            href: nextUrl,
            className: classNames('button button--link', {
                disabled: nextUrl == null
            })
        };

        let loadMore = null;
        if (nextUrl) {
            loadMore = (
                <div className="load-more">
                    <button className="button gtm-loadmore-button" onClick={this.onLoadMore}>
                        {this.state.isLoading ? 'Loading...' : 'Load More'}
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
                            <a {...prevProps}>Previous</a>
                            <a {...nextProps}>Next</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

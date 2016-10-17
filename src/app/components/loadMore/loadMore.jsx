import React, {Component, PropTypes} from 'react';
import {handleHistory, navigateAction} from 'fluxible-router';
import Button from '../buttons/button';
import LoadingIcon from './loadingIcon';

class LoadMore extends Component {

    constructor(...args) {
        super(...args);
    }

    static contextTypes = {
        executeAction: PropTypes.func
    };

    static propTypes = {
        currentPage: PropTypes.number,
        currentRoute: PropTypes.object,
        text: PropTypes.string,
        totalPages: PropTypes.number,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        currentPage: 0,
        currentRoute: {},
        text: 'Load more',
        totalPages: 0,
        isLoading: false
    };

    onClick = (e) => {
        e.preventDefault();
        if (this.props.isLoading === true) return false;
        this.context.executeAction(navigateAction, {
            url: `/${this.props.currentRoute.get('params').get('all')}?page=${this.props.currentPage + 1}`
        });
    };

    render() {
        if (!this.props.isLoading && this.props.currentPage + 1 >= this.props.totalPages) return null;
        return (
            <Button modifier="load-more" onClick={this.onClick}>
                <span>
                    {this.props.text}
                </span>
                <LoadingIcon isLoading={this.props.isLoading} />
            </Button>
        );
    }
}

export default handleHistory(LoadMore, { enableScroll: false });

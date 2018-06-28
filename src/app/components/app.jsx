import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import GoogleFont from './html/googleFont';
import DefaultTemplate from './templates/default';

class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.shape({
            handler: PropTypes.func
        }),
        // eslint-disable-next-line react/no-unused-prop-types
        pageTitle: PropTypes.string,
        currentNavigateError: PropTypes.object
    };

    static defaultProps = {
        currentRoute: null,
        pageTitle: null,
        currentNavigateError: null
    };

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    componentDidUpdate(prevProps) {
        const { pageTitle } = this.props;
        if (pageTitle !== prevProps.pageTitle) {
            document.title = pageTitle;
        }
    }

    render() {
        const { currentRoute, currentNavigateError } = this.props;
        const Handler = currentRoute ? currentRoute.handler : DefaultTemplate;
        const className = canUseDOM ? '' : 'no-js';
        return (
            <div className={className}>
                <GoogleFont />
                <Handler currentNavigateError={currentNavigateError} />
            </div>
        );
    }
}

export default provideContext(handleHistory(Application), {
    config: PropTypes.object
});

/* eslint-disable */
import { hot } from 'react-hot-loader/root';
import AdManager from '@bxm/ad/lib/google/components/adManager';
import { provideContext } from '@bxm/flux';
import canUseDOM from 'exenv';
import { handleHistory } from 'fluxible-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoogleFont from './html/googleFont';
import Error from './pages/error';

class ErrorBoundary extends Component {
    componentDidCatch(error, errorInfo) {
        // TODO - Do something useful with errors
    }

    render() {
        const { children } = this.props;

        return children;
    }
}
class Application extends Component {
    static propTypes = {
        currentRoute: PropTypes.shape({
            handler: PropTypes.func
        }),
        pageTitle: PropTypes.string,
        currentNavigateError: PropTypes.object
    };

    static defaultProps = {
        currentRoute: null,
        pageTitle: null,
        currentNavigateError: null
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    componentDidMount() {
        const { getStore } = this.context;
        const emailLinkTrackingData = getStore('PageStore').getEmailLinkTrackingData();

        if (emailLinkTrackingData) {
            window.dataLayer.push(emailLinkTrackingData);
        }
    }

    componentDidUpdate(prevProps) {
        const { pageTitle } = this.props;

        if (pageTitle !== prevProps.pageTitle) {
            document.title = pageTitle;
        }
    }

    render() {
        const { currentRoute, currentNavigateError } = this.props;
        const Handler = currentRoute ? currentRoute.handler : Error;
        const className = canUseDOM ? '' : 'no-js';

        return (
            <ErrorBoundary>
                <div className={className}>
                    <GoogleFont />
                    <Handler currentNavigateError={currentNavigateError} currentUrl={currentRoute && currentRoute.url} />
                </div>
            </ErrorBoundary>
        );
    }
}

export default hot(
    provideContext(handleHistory(AdManager(Application)), {
        config: PropTypes.object
    })
);

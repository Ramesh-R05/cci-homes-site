/* eslint-disable */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import canUseDOM from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import AdManager from '@bxm/ad/lib/google/components/adManager';
import GoogleFont from './html/googleFont';
import Error from './pages/error';
import frontEndLogger from '../../frontEndLogger';

class ErrorBoundary extends Component {
    constructor(props) {

        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        frontEndLogger.push({ 'text': 'app.js/HTL - an error has been thrown by derivedStateFromError and the fallback UI is getting rendered',
                              'error': error});

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // TODO - Do something useful with errors
        frontEndLogger.push({ 'text': 'app.js/HTL - an error has been thrown by componentDidCatch and the fallback UI is getting rendered',
                              'error': error,
                              'errorInfo': errorInfo});

        this.setState({ hasError: true });
    }

    render() {
        const { children } = this.props;

        if (this.state.hasError) {
            // Render fallback UI
            return <h1>Something went wrong.</h1>;
        }

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

export default provideContext(handleHistory(AdManager(Application)), {
    config: PropTypes.object
});

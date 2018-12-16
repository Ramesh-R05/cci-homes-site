import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import AdManager from '@bxm/ad/lib/google/components/adManager';
import GoogleFont from './html/googleFont';
import DefaultTemplate from './templates/default';

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
        const Handler = currentRoute ? currentRoute.handler : DefaultTemplate;
        const className = canUseDOM ? '' : 'no-js';

        return (
            <div className={className}>
                <GoogleFont />
                <Handler currentNavigateError={currentNavigateError} currentUrl={currentRoute.url} />
            </div>
        );
    }
}

export default provideContext(handleHistory(AdManager(Application)), {
    config: PropTypes.object
});

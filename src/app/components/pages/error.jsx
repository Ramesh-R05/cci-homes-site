import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SiteHeader from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SiteFooter from '../site-footer';

export class Error extends Component {
    static propTypes = {
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        currentUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        contentErrorStatus: null,
        currentNavigateError: null
    };

    render() {
        const { currentUrl, contentErrorStatus, currentNavigateError } = this.props;

        const templateProps = {
            classModifier: 'error-page',
            currentUrl,
            contentErrorStatus,
            currentNavigateError,
            HeaderComponent: SiteHeader,
            FooterComponent: SiteFooter
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(Error, ['PageStore'], context => {
    const PageStore = context.getStore('PageStore');

    return {
        contentErrorStatus: PageStore.getErrorStatus()
    };
});

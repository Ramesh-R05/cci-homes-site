import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import ContentHeaderSlot from './slots/contentHeaderSlot';
import ContentSlot from './slots/contentSlot';
import FooterSlot from './slots/footerSlot';
import HeaderSlot from './slots/headerSlot';
import OffCanvas from '../../off-canvas/offCanvas';
import errorRenderer from './slots/errorRenderer';

export default class PageTemplate extends Component {
    static propTypes = {
        HeaderComponent: PropTypes.func.isRequired,
        headerProps: PropTypes.object,
        ContentHeaderComponent: PropTypes.func,
        contentHeaderProps: PropTypes.object,
        ContentComponent: PropTypes.func.isRequired,
        contentProps: PropTypes.object,
        FooterComponent: PropTypes.func.isRequired,
        footerProps: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        menuClasses: PropTypes.string.isRequired,
        classModifier: PropTypes.string,
        currentUrl: PropTypes.string.isRequired,
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        toggleMenu: PropTypes.func.isRequired,
        withAdsWrapper: PropTypes.bool,
        useContentTitle: PropTypes.bool
    };

    static defaultProps = {
        ContentHeaderComponent: null,
        classModifier: null,
        contentErrorStatus: null,
        currentNavigateError: null,
        hamburgerNavItems: [],
        headerNavItems: [],
        withAdsWrapper: false,
        contentProps: {
            content: {}
        },
        useContentTitle: false,
        headerProps: {},
        contentHeaderProps: {},
        footerProps: {}
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const {
            config: {
                site: { name: siteName }
            }
        } = this.context;
        const {
            HeaderComponent,
            ContentHeaderComponent,
            ContentComponent,
            FooterComponent,
            classModifier,
            menuClasses,
            currentUrl,
            hamburgerNavItems,
            headerNavItems,
            headerProps,
            toggleMenu,
            contentProps,
            useContentTitle,
            contentHeaderProps,
            currentNavigateError,
            contentErrorStatus,
            withAdsWrapper,
            footerProps
        } = this.props;

        const ErrorComponent = errorRenderer({ contentProps, currentNavigateError, contentErrorStatus });

        const rootClass = classNames('page-template', {
            [`page-template--${classModifier}`]: classModifier,
            [`page-template--error-page`]: ErrorComponent
        });

        const offCanvasWrapperClasses = classNames('page-template__off-canvas-wrapper', menuClasses);

        return (
            <div className={rootClass}>
                <div className={offCanvasWrapperClasses}>
                    <div className="page-template__header">
                        <HeaderSlot
                            Component={HeaderComponent}
                            currentUrl={currentUrl}
                            navItems={headerNavItems}
                            toggleMenuFunc={toggleMenu}
                            siteName={siteName}
                            headerProps={headerProps}
                        />
                    </div>
                    <OffCanvas navItems={hamburgerNavItems} currentUrl={currentUrl} toggleSideMenu={toggleMenu} />
                    {!ErrorComponent && ContentHeaderComponent && (
                        <div className="page-template__content-header">
                            <ContentHeaderSlot
                                Component={ContentHeaderComponent}
                                contentProps={contentProps}
                                useContentTitle={useContentTitle}
                                contentHeaderProps={contentHeaderProps}
                            />
                        </div>
                    )}
                    <div className="page-template__content">
                        {(ErrorComponent && <ErrorComponent />) || (
                            <ContentSlot Component={ContentComponent} contentProps={contentProps} withAdsWrapper={withAdsWrapper} />
                        )}
                    </div>
                    <div className="page-template__footer">
                        <FooterSlot Component={FooterComponent} footerProps={footerProps} />
                    </div>
                </div>
            </div>
        );
    }
}

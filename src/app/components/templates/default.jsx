import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connectToStores } from '@bxm/flux';
import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';
import Header from '@bxm/site-header';
import get from 'lodash.get';
import OffCanvas from '../off-canvas/offCanvas';
import SiteFooter from '../site-footer';
import HomeHeader from '../home/header';
import BrandHeader from '../brand/header';
import SectionHeader from '../section/header';
import HomePage from '../home/home';
import Article from '../article/page';
import Brand from '../brand/section';
import NavSection from '../section/navigationTag/section';
import Tag from '../section/tag/section';
import ConnectedDirectories from '../section/directories';
import Campaign from '../section/sponsorTag/section';
import ErrorHandlerBuilder from '../error/errorHandlerBuilder';
import getBrand from '../brand/utilities/getBrand';
import defaultRenderFailed from '../../actions/defaultRenderFailed';
import ListingRenderer from '../listings/templates/listingRenderer';
import DirectoryHome from '../listings/components/directoryHome';
import ListingCategory from '../listings/templates/listingCategory';

@hamburgerWrapper
class DefaultTemplate extends Component {
    static propTypes = {
        content: PropTypes.shape({
            tagsDetails: PropTypes.arrayOf(PropTypes.shape({ displayName: PropTypes.string })),
            url: PropTypes.string.isRequired,
            nodeType: PropTypes.string.isRequired
        }),
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        currentUrl: PropTypes.string.isRequired,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        toggleSideMenu: PropTypes.func.isRequired,
        menuClasses: PropTypes.string.isRequired,
        theme: PropTypes.shape({
            headerSmallBackground: PropTypes.string,
            headerMediumBackground: PropTypes.string,
            headerLargeBackground: PropTypes.string,
            headerLogoAlignment: PropTypes.string,
            headerLogoColour: PropTypes.string,
            themeAlignment: PropTypes.string,
            themeColour: PropTypes.string,
            themeImage: PropTypes.string
        }),
        contactForm: PropTypes.object
    };

    static defaultProps = {
        content: null,
        contentErrorStatus: null,
        currentNavigateError: null,
        headerNavItems: [],
        hamburgerNavItems: [],
        theme: null,
        contactForm: null
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        config: PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const {
            content,
            contentErrorStatus,
            currentNavigateError,
            currentUrl,
            headerNavItems,
            hamburgerNavItems,
            toggleSideMenu,
            menuClasses,
            theme,
            contactForm
        } = this.props;

        return (
            nextProps.content !== content ||
            nextProps.contentErrorStatus !== contentErrorStatus ||
            nextProps.currentNavigateError !== currentNavigateError ||
            nextProps.currentUrl !== currentUrl ||
            nextProps.headerNavItems !== headerNavItems ||
            nextProps.hamburgerNavItems !== hamburgerNavItems ||
            nextProps.toggleSideMenu !== toggleSideMenu ||
            nextProps.menuClasses !== menuClasses ||
            nextProps.theme !== theme ||
            nextProps.contactForm !== contactForm
        );
    }

    toggleMenu = () => {
        const { toggleSideMenu } = this.props;

        toggleSideMenu('left');
    };

    getPageMetadata() {
        const { content, contentErrorStatus, currentNavigateError } = this.props;
        const { executeAction } = this.context;

        if (!content || currentNavigateError || contentErrorStatus) {
            let errorStatus = ErrorHandlerBuilder.DEFAULT_CODE;

            if (currentNavigateError) {
                errorStatus = currentNavigateError.statusCode;
            } else if (contentErrorStatus) {
                errorStatus = contentErrorStatus.status;
            }

            return {
                ContentHandler: ErrorHandlerBuilder(errorStatus)
            };
        }

        if (content && content.title && content.title.toLowerCase() === 'directories') {
            return {
                ContentHeaderHandler: SectionHeader,
                ContentHandler: ConnectedDirectories
            };
        }

        switch (content.nodeType.toLowerCase()) {
            case 'homepage':
                return {
                    ContentHeaderHandler: HomeHeader,
                    ContentHandler: HomePage
                };
            case 'homesarticle':
                return {
                    ContentHeaderHandler: HomeHeader,
                    ContentHandler: Article
                };
            case 'navigationsection':
                return {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: NavSection
                };
            case 'commercialtagsection':
                return {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: NavSection
                };
            case 'tagsection':
                return {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: Tag
                };
            case 'brandsection':
                return {
                    ContentHeaderHandler: BrandHeader,
                    ContentHandler: Brand
                };
            case 'campaign':
                return {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: Campaign
                };
            case 'gallery':
                return {
                    ContentHeaderHandler: HomeHeader,
                    ContentHandler: Article
                };
            case 'standardlisting':
                return {
                    ContentHeaderHandler: null,
                    ContentHandler: ListingRenderer,
                    excludeAdsWrapper: true
                };
            case 'enhancedlisting':
                return {
                    ContentHeaderHandler: null,
                    ContentHandler: ListingRenderer,
                    excludeAdsWrapper: true
                };
            case 'premiumlisting':
                return {
                    ContentHeaderHandler: null,
                    ContentHandler: ListingRenderer,
                    excludeAdsWrapper: true
                };
            case 'directoryhome':
                return {
                    ContentHeaderHandler: null,
                    ContentHandler: DirectoryHome,
                    excludeAdsWrapper: true
                };
            case 'listingsbycategory':
                return {
                    ContentHeaderHandler: null,
                    ContentHandler: ListingCategory,
                    excludeAdsWrapper: true
                };
            default:
                executeAction(defaultRenderFailed, `Unsupported nodeType ${content.nodeType}`);

                return {
                    ContentHandler: ErrorHandlerBuilder(500)
                };
        }
    }

    render() {
        const { content, headerNavItems, hamburgerNavItems, currentUrl, menuClasses, theme, contactForm } = this.props;
        const { config } = this.context;
        const { ContentHeaderHandler, ContentHandler, excludeAdsWrapper } = this.getPageMetadata();

        let brandConfig = {};
        let contentHeaderTitle = '';

        if (content) {
            const headerTitleProperty = content.nodeType.toLowerCase() === 'commercialtagsection' ? 'contentTitle' : 'tagsDetails[0].displayName';
            contentHeaderTitle = get(content, headerTitleProperty, content.title);
            brandConfig = getBrand(config, content.source);
        }

        const getClassModifierFromNodeType = contentProp =>
            contentProp && contentProp.nodeType && typeof contentProp.nodeType === 'string' ? content.nodeType.toLowerCase() : 'unknown';

        const themeEnabled = !!theme && !!theme.headerSmallBackground && !!theme.headerMediumBackground && !!theme.headerLargeBackground;

        const defaultTemplateClassName = classNames('default-template', `default-template--${getClassModifierFromNodeType(content)}`);

        return (
            <div className={defaultTemplateClassName}>
                <div className={menuClasses}>
                    <Header
                        currentUrl={currentUrl}
                        navItems={headerNavItems}
                        siteName={config.site.name}
                        toggleMenu={this.toggleMenu}
                        permanentlyFixedIfShorterThan={49}
                        theme={themeEnabled ? theme : {}}
                        isExpanded
                        wrapperClassName="header"
                        headerClassName="header__inner"
                    />

                    <OffCanvas navItems={hamburgerNavItems} currentUrl={currentUrl} toggleSideMenu={this.toggleMenu} />

                    {ContentHeaderHandler && (
                        <ContentHeaderHandler
                            {...this.props}
                            title={contentHeaderTitle}
                            logo={brandConfig.logo}
                            sponsorName={content.sponsor || 'homes_sponsor'}
                        />
                    )}

                    {ContentHandler &&
                        (excludeAdsWrapper ? (
                            <ContentHandler brandConfig={brandConfig} content={content} contactForm={contactForm} />
                        ) : (
                            <AdsWrapper>
                                <ContentHandler brandConfig={brandConfig} content={content} />
                            </AdsWrapper>
                        ))}

                    <SiteFooter />
                </div>
            </div>
        );
    }
}

export default connectToStores(DefaultTemplate, ['PageStore', 'NavigationStore', 'DirectoriesStore', 'DirectoryStore', 'EmailStore'], context => {
    const PageStore = context.getStore('PageStore');
    const DirectoriesStore = context.getStore('DirectoriesStore');
    const NavigationStore = context.getStore('NavigationStore');
    const DirectoryStore = context.getStore('DirectoryStore');
    const EmailStore = context.getStore('EmailStore');

    let content;
    let contentErrorStatus;
    let headerNavItems;
    let hamburgerNavItems;
    let contactForm;

    if (PageStore.getContent()) {
        content = PageStore.getContent();
    } else if (DirectoriesStore.getContent()) {
        content = DirectoriesStore.getContent();
    } else if (DirectoryStore.getContent()) {
        content = DirectoryStore.getContent();
    }

    if (PageStore.getErrorStatus()) {
        contentErrorStatus = PageStore.getErrorStatus();
    } else if (DirectoriesStore.getErrorStatus()) {
        contentErrorStatus = DirectoriesStore.getErrorStatus();
    } else if (DirectoryStore.getErrorStatus()) {
        contentErrorStatus = DirectoryStore.getErrorStatus();
    }

    if (NavigationStore.getHeaderItems().length) {
        headerNavItems = NavigationStore.getHeaderItems();
    } else if (DirectoriesStore.getHeaderItems().length) {
        headerNavItems = DirectoriesStore.getHeaderItems();
    } else if (DirectoryStore.getHeaderItems().length) {
        headerNavItems = DirectoryStore.getHeaderItems();
    }

    if (NavigationStore.getHamburgerItems().length) {
        hamburgerNavItems = NavigationStore.getHamburgerItems();
    } else if (DirectoriesStore.getHamburgerItems().length) {
        hamburgerNavItems = DirectoriesStore.getHamburgerItems();
    } else if (DirectoryStore.getHamburgerItems().length) {
        hamburgerNavItems = DirectoryStore.getHamburgerItems();
    }

    if (EmailStore.getContactForm()) {
        contactForm = EmailStore.getContactForm();
    }

    return {
        content,
        theme: PageStore.getTheme(),
        contentErrorStatus,
        headerNavItems,
        hamburgerNavItems,
        contactForm
    };
});

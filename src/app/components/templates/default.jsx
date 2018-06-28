import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import MenuStore from '../../stores/menu';
import Uniheader from '../header/uniheader';
import SiteHeader from '../header/header';
import SiteFooter from '../footer/footer';
import SideMenu from '../side-menu/sideMenu';
import HomeHeader from '../home/header';
import BrandHeader from '../brand/header';
import SectionHeader from '../section/header';
import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import HomePage from '../home/home';
import Article from '../article/page';
import Brand from '../brand/section';
import NavSection from '../section/navigationTag/section';
import Tag from '../section/tag/section';
import Campaign from '../section/sponsorTag/section';
import ErrorHandlerBuilder from '../error/errorHandlerBuilder';
import getBrand from '../brand/utilities/getBrand';
import defaultRenderFailed from '../../actions/defaultRenderFailed';
import get from 'lodash.get';

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.shape({
            tagsDetails: PropTypes.arrayOf(PropTypes.shape({ displayName: PropTypes.string }))
        }),
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        isSideMenuOpen: PropTypes.bool,
        headerNavItems: PropTypes.array
    };

    static defaultProps = {
        content: null,
        contentErrorStatus: null,
        currentNavigateError: null,
        isSideMenuOpen: false,
        headerNavItems: []
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        config: PropTypes.object.isRequired
    };

    render() {
        const { content, isSideMenuOpen, headerNavItems } = this.props;
        let brandConfig = {};
        let contentHeaderTitle = '';
        if (content) {
            contentHeaderTitle = get(content, 'tagsDetails[0].displayName', content.title);
            brandConfig = getBrand(this.context.config, content.source);
        }
        const { ContentHeaderHandler, ContentHandler } = this.getPageMetadata();

        return (
            <div className="default-template">

                { content && content.url === '/' ? <Uniheader /> : null }

                <SiteHeader
                  isSideMenuOpen={isSideMenuOpen}
                  navItems={headerNavItems}
                />

                <SideMenu open={isSideMenuOpen} navItems={headerNavItems} />

                { ContentHeaderHandler
                    ? <ContentHeaderHandler
                      {...this.props}
                      title={contentHeaderTitle}
                      logo={brandConfig.logo}
                      sponsorName={content.sponsor || 'homes_sponsor'}
                    />
                    : null
                }

                <AdsWrapper>
                    <ContentHandler
                      brandConfig={brandConfig}
                      content={content}
                      isSideMenuOpen={isSideMenuOpen}
                    />
                </AdsWrapper>

                <SiteFooter />

            </div>
        );
    }

    getPageMetadata() {
        const { content, contentErrorStatus, currentNavigateError } = this.props;

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
        default:
            this.context.executeAction(defaultRenderFailed, `Unsupported nodeType ${content.nodeType}`);
            return {
                ContentHandler: ErrorHandlerBuilder(500)
            };
        }
    }
}

export default connectToStores(DefaultTemplate, ['PageStore', MenuStore], context => ({

    content: context.getStore('PageStore').getContent(),
    contentErrorStatus: context.getStore('PageStore').getErrorStatus(),
    isSideMenuOpen: context.getStore(MenuStore).isSideMenuOpen(),
    headerNavItems: context.getStore('PageStore').getHeaderItems()

}));

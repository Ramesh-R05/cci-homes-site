import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
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
import Gallery from '../gallery/gallery';

import ErrorHandlerBuilder from '../error/errorHandlerBuilder';

import {load} from '@bxm/config';
const config = load();

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        headerNavItems: PropTypes.array
    };

    static defaultProps = {
        content: null,
        contentErrorStatus: null,
        isSideMenuOpen: false,
        headerNavItems: []
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        config: React.PropTypes.object
    };

    getConfigFromBrandSectionForUrlName = (urlName) => {
        return urlName ? (this.context.config.sectionBrands[urlName] || {}) : {};
    };

    getContentHeaderTitle = (contentHeaderTitle, content) => {
        contentHeaderTitle = content.title;
        if (content.tagsDetails && content.tagsDetails.length > 0) {
            contentHeaderTitle = content.tagsDetails[0].displayName;
        }
        return contentHeaderTitle;
    };

    constructor(...args) {
        super(...args);
    }

    componentDidMount() {
        // Temp added here due to unforseen update of versions when updating react.
        // This loads <picture> element in older browsers and IE
        require('picturefill');
    }

    render() {
        const {content, contentErrorStatus, isSideMenuOpen, headerNavItems} = this.props;
        let brandConfig = {};
        let contentHeaderTitle = '';
        if (content) {
            const {urlName, nodeType} = content;
            brandConfig = this.getConfigFromBrandSectionForUrlName(urlName);
            contentHeaderTitle = this.getContentHeaderTitle(contentHeaderTitle, content);
        }
        const {ContentHeaderHandler, ContentHandler, hideFooter, hideHeader} = this.getPageMetadata();
        const localeData = config.get('localeData');

        return (
            <div className="default-template">

                {   content && content.url === '/' ? <Uniheader /> : null }

                {   hideHeader
                    ?   null
                    :   <SiteHeader
                            isSideMenuOpen={isSideMenuOpen}
                            navItems={headerNavItems}
                        />
                }

                <SideMenu
                    open={isSideMenuOpen}
                    navItems={headerNavItems}
                    data={localeData}
                />

                {   ContentHeaderHandler
                    ?   <ContentHeaderHandler
                            {...this.props}
                            title={contentHeaderTitle}
                            logo={brandConfig.logo}
                            sponsorName={content.sponsor || 'homes_sponsor'}
                        />
                    :   null
                }

                { content && content.nodeType === 'Gallery' ?

                    <ContentHandler
                        brandConfig={brandConfig}
                        content={content}
                        isSideMenuOpen={isSideMenuOpen}
                    />

                    :

                    <AdsWrapper>
                        <ContentHandler
                            brandConfig={brandConfig}
                            content={content}
                            isSideMenuOpen={isSideMenuOpen}
                        />
                    </AdsWrapper>

                }



                {   hideFooter ? null : <SiteFooter config={localeData} /> }

            </div>
        );
    }

    getPageMetadata() {
        const {content, contentErrorStatus} = this.props;

        if (contentErrorStatus) { return this.handleContentError(contentErrorStatus); }
        if (!content) { return this.handleNoContent(); }

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
                    ContentHandler: Gallery
                };
            default:
                console.error({message: `Unsupported nodeType (${content.nodeType})`});
                return this.handleNoContent();
        }
    }

    handleNoContent() {
        return {
            ContentHandler: ErrorHandlerBuilder(500)
        };
    }

    handleContentError(errorStatus) {
        return {
            ContentHandler: ErrorHandlerBuilder(errorStatus.status) || ErrorHandlerBuilder(500)
        };
    }
}

export default connectToStores(DefaultTemplate, ['PageStore', MenuStore], (context) => {
    return {
        content: context.getStore('PageStore').getContent(),
        contentErrorStatus: context.getStore('PageStore').getErrorStatus(),
        isSideMenuOpen: context.getStore(MenuStore).isSideMenuOpen(),
        headerNavItems: context.getStore('PageStore').getHeaderItems()
    };
});

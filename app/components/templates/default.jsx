import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import MenuStore from '../../stores/menu';
import NetworkHeader from '@bxm/header/lib/header/header';
import Header from '../header/header';
import Footer from '../footer/footer';
import SideMenu from '../side-menu/sideMenu';
import errorHandlerBuilder from '../error/errorHandlerBuilder';
import cx from 'classnames';
import {load} from '@bxm/config';
const config = load();

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        navItems: PropTypes.array,
        contentErrorStatus: PropTypes.object
    };

    static defaultProps = {
        content: null,
        isSideMenuOpen: false,
        navItems: [],
        contentErrorStatus: null
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const {Handler, hideNetworkHeader, hideFooter, hideHeader, isExpanded} = this.getPageMetadata();
        const localeData = config.get('localeData');
        const menuSliderClassName = cx('side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div className="default-template">
                <div className={cx('global-header-slider', menuSliderClassName)}>
                    {hideNetworkHeader ? null : <NetworkHeader/>}
                </div>
                {hideHeader ? null :
                    <Header
                        isExpanded={isExpanded}
                        isSideMenuOpen={this.props.isSideMenuOpen}
                        navItems={this.props.navItems}
                    />
                }
                <SideMenu
                    open={this.props.isSideMenuOpen}
                    navItems={this.props.navItems}
                    data={localeData}
                />
                <Handler
                    content={this.props.content}
                    isSideMenuOpen={this.props.isSideMenuOpen}
                />
                {hideFooter ? null : <Footer config={localeData} />}
            </div>
        );
    }

    getPageMetadata() {
        // Error cases
        if (this.props.contentErrorStatus) {
            return this.handleContentError(this.props.contentErrorStatus);
        } else if (!this.props.content) {
            return this.handleNoContent();
        }

        switch (this.props.content.nodeType) {
            case 'Homepage':
                return {
                    Handler: require('../home/home'),
                    isExpanded: true
                };
            case 'HomesArticle':
                return {
                    Handler: require('../article/section'),
                    hideFooter: true
                };
            case 'NavigationSection':
                return {
                    Handler: require('../section/section')
                };
            case 'BrandSection':
                return {
                    Handler: require('../brand/section')
                };
            case 'Gallery':
                return {
                    Handler: require('@bxm/gallery/lib/components/page/gallery'),
                    hideNetworkHeader: true,
                    hideHeader: true,
                    hideFooter: true
                };
            default:
                console.error({message: `Unsupported nodeType (${this.props.content.nodeType})`});
                return this.handleNoContent();
        }
    }

    handleNoContent() {
        return {
            Handler: errorHandlerBuilder(500)
        };
    }

    handleContentError(errorStatus) {
        return {
            Handler: errorHandlerBuilder(errorStatus.status) || errorHandlerBuilder(500)
        };
    }
}

export default connectToStores(DefaultTemplate, [EntityStore, MenuStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        contentErrorStatus: stores.EntityStore.getErrorStatus(),
        isSideMenuOpen: stores.MenuStore.isSideMenuOpen(),
        navItems: stores.MenuStore.getNavItems()
    };
});

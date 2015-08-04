import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import MenuStore from '../../stores/menu';
import NetworkHeader from '@bxm/header/lib/header/header';
import Header from '../header/header';
import Footer from '../footer/footer';
import SideMenu from '../side-menu/sideMenu';
import {isUndefined} from 'lodash/lang';
import cx from 'classnames';

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        navItems: PropTypes.array
    };

    static defaultProps = {
        isSideMenuOpen: false,
        navItems: []
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        if (isUndefined(this.props.content)) return null;

        const page = this.getPageMetadata();
        if (!page) return null;

        const {Handler, hideNetworkHeader, hideFooter, hideHeader, isExpanded} = page;
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
                />
                <Handler
                    content={this.props.content}
                    isSideMenuOpen={this.props.isSideMenuOpen}
                />
                {hideFooter ? null : <Footer />}

            </div>
        );
    }

    getPageMetadata() {
        switch (this.props.content.nodeType) {
            case 'Homepage': return {
                Handler: require('../home/home'),
                isExpanded: true
            };
            case 'HomesArticle': return {
                Handler: require('../article/section'),
                hideFooter: true
            };
            case 'NavigationSection': return {
                Handler: require('../section/section')
            };
            case 'Gallery': return {
                Handler: require('../gallery/gallery'),
                hideNetworkHeader: true,
                hideHeader: true,
                hideFooter: true
            };
            default:
                console.error({message: 'NotFound is not implemented'});
                return null;
        }
    }
}

export default connectToStores(DefaultTemplate, [EntityStore, MenuStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        isSideMenuOpen: stores.MenuStore.isSideMenuOpen(),
        navItems: stores.MenuStore.getNavItems()
    };
});

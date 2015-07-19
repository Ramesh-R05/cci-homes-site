import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import MenuStore from '../../stores/menu';
import NetworkHeader from '@bxm/header/lib/header/header';
import Header from '../header/header';
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

        const {Handler, hideNetworkHeader, hideHeader} = page;
        const menuSliderClassName = cx({
            'side-menu-slider': true,
            'side-menu-slider--open': this.props.isSideMenuOpen
        });

        return (
            <div className="default-template">
                <div className={cx('global-header-slider', menuSliderClassName)}>
                    {hideNetworkHeader ? null : <NetworkHeader/>}
                </div>
                {hideHeader ? null : <Header isSideMenuOpen={this.props.isSideMenuOpen} navItems={this.props.navItems}/>}
                <SideMenu open={this.props.isSideMenuOpen} navItems={this.props.navItems}/>
                <div className={menuSliderClassName}>
                    <Handler content={this.props.content}/>
                </div>
            </div>
        );
    }

    getPageMetadata() {
        switch (this.props.content.nodeType) {
            case 'Homepage': return {
                Handler: require('../home/home')
            };
            case 'HomesArticle': return {
                Handler: require('../article/section'),
                hideHeader: true
            };
            case 'NavigationSection': return {
                Handler: require('../section/section'),
                hideHeader: true
            };
            case 'Gallery': return {
                Handler: require('../gallery/gallery'),
                hideNetworkHeader: true,
                hideHeader: true
            };
            default:
                console.error({message: 'NotFound is not implemented'});
                return null;
        }
    }
}

export default connectToStores(DefaultTemplate, [EntityStore, MenuStore], (stores) => {
    console.log(stores.MenuStore.getNavItems);
    return {
        content: stores.EntityStore.getContent(),
        isSideMenuOpen: stores.MenuStore.isSideMenuOpen(),
        navItems: stores.MenuStore.getNavItems()
    };
});

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import clone from 'lodash/lang/clone';
import get from 'lodash.get';
import Navigation from '../header/navigation';
import SideMenuLogo from './sideMenuLogo';
import activateSideMenu from '../../actions/menuActions';

export default class SideMenu extends Component {
    static displayName = 'SideMenu';

    static propTypes = {
        open: PropTypes.bool,
        navItems: PropTypes.array.isRequired
    };

    static defaultProps = {
        open: false
    };

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func
    };

    activateSideMenu = () => {
        this.context.executeAction(activateSideMenu);
    };

    render() {
        const { open, navItems } = this.props;
        const hamburgerBrands = get(this.context, 'config.hamburgerBrands', []);

        if (!navItems) return null;

        const items = clone(navItems);
        items.unshift({ name: 'Home', url: '/' });

        const wrapperClassName = cx({
            'side-menu': true,
            'side-menu--open': open
        });
        const logoClassName = 'side-menu-list';
        const logoClassNameGTMPrefix = 'gtm-hamburger-';
        const sideMenuLogos = hamburgerBrands.map(item => (
            <SideMenuLogo key={item.url} logoItem={item} openInNewTab logoClassName={logoClassName} logoClassNameGTMPrefix={logoClassNameGTMPrefix} />
        ));

        return (
            <div className={wrapperClassName}>
                <div className="side-menu__bar">
                    <div className="side-menu__container">
                        <button
                            className="side-menu__close"
                            onClick={this.activateSideMenu}
                            /* eslint-disable react/no-danger, max-len */
                            dangerouslySetInnerHTML={{
                                __html: `
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 22 22">
                                    <path d="M12.757,10.979 C12.757,10.979 21.608,19.830 21.608,19.830 C22.099,20.321 22.099,21.117 21.608,21.607 C21.117,22.098 20.322,22.098 19.831,21.607 C19.831,21.607 10.980,12.756 10.980,12.756 C10.980,12.756 2.129,21.607 2.129,21.607 C1.639,22.098 0.843,22.098 0.352,21.607 C-0.138,21.117 -0.138,20.321 0.352,19.830 C0.352,19.830 9.203,10.979 9.203,10.979 C9.203,10.979 0.352,2.129 0.352,2.129 C-0.138,1.638 -0.138,0.843 0.352,0.351 C0.843,-0.139 1.639,-0.139 2.129,0.351 C2.129,0.351 10.980,9.202 10.980,9.202 C10.980,9.202 19.831,0.351 19.831,0.351 C20.322,-0.139 21.117,-0.139 21.608,0.351 C22.099,0.843 22.099,1.638 21.608,2.129 C21.608,2.129 12.757,10.979 12.757,10.979 Z" id="path-1" class="cls-2" fill-rule="evenodd" />
                                </svg>
                            `
                            }}
                        />
                        <Navigation className="side-menu__nav" items={items} linkClassName="gtm-hamburger-section" showGroupLabel={false} />
                        <div className="side-menu__separator" />
                        <ul className={logoClassName}>{sideMenuLogos}</ul>
                    </div>
                </div>
                <button className="side-menu__overlay" onClick={this.activateSideMenu} />
            </div>
        );
    }
}

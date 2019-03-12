import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MobileOffCanvas from '@bxm/nav/lib/components/offcanvas/content';
import HamburgerNav from '@bxm/site-header/lib/components/hamburgerNav';

export default class OffCanvas extends Component {
    static displayName = 'SideMenu';

    static propTypes = {
        toggleSideMenu: PropTypes.func,
        currentUrl: PropTypes.string,
        navItems: PropTypes.array,
        className: PropTypes.string
    };

    static defaultProps = {
        toggleSideMenu: () => {},
        currentUrl: '/',
        className: 'off-canvas',
        navItems: []
    };

    render() {
        const { navItems, toggleSideMenu, currentUrl, className } = this.props;

        return (
            <MobileOffCanvas side="left" toggleSideMenu={toggleSideMenu} className={className}>
                <div className="off-canvas__content-wrapper">
                    <button
                        className="close-btn"
                        onClick={toggleSideMenu}
                        type="button"
                        /* eslint-disable-next-line react/no-danger */
                        dangerouslySetInnerHTML={{
                            __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 22 22"><path d="M12.757,10.979 C12.757,10.979 21.608,19.830 21.608,19.830 C22.099,20.321 22.099,21.117 21.608,21.607 C21.117,22.098 20.322,22.098 19.831,21.607 C19.831,21.607 10.980,12.756 10.980,12.756 C10.980,12.756 2.129,21.607 2.129,21.607 C1.639,22.098 0.843,22.098 0.352,21.607 C-0.138,21.117 -0.138,20.321 0.352,19.830 C0.352,19.830 9.203,10.979 9.203,10.979 C9.203,10.979 0.352,2.129 0.352,2.129 C-0.138,1.638 -0.138,0.843 0.352,0.351 C0.843,-0.139 1.639,-0.139 2.129,0.351 C2.129,0.351 10.980,9.202 10.980,9.202 C10.980,9.202 19.831,0.351 19.831,0.351 C20.322,-0.139 21.117,-0.139 21.608,0.351 C22.099,0.843 22.099,1.638 21.608,2.129 C21.608,2.129 12.757,10.979 12.757,10.979 Z" id="path-1" class="cls-2" fill-rule="evenodd"></path></svg>`
                        }}
                    />
                    <HamburgerNav items={navItems} currentUrl={currentUrl} />
                </div>
            </MobileOffCanvas>
        );
    }
}

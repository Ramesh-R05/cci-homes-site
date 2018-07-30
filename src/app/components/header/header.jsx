import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import get from 'lodash.get';
import pin from '@bxm/behaviour/lib/components/pin';
import throttle from 'lodash/function/throttle';
import MenuButton from './menuButton';
import Navigation from './navigation';
import HeaderSearch from './headerSearch';

class Header extends Component {
    static displayName = 'Header';

    static propTypes = {
        pinned: PropTypes.bool,
        pinOffset: PropTypes.number,
        isSideMenuOpen: PropTypes.bool,
        navItems: PropTypes.array.isRequired
    };

    static defaultProps = {
        isSideMenuOpen: false,
        pinned: false,
        pinOffset: 0
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    static constants = {
        UNIHEADER_HEIGHT: 49,
        BREAKPOINT_SMALL_MAX: 691,
        SCROLL_TOP_BOUNCE_ALLOWANCE: 10
    };

    constructor(...args) {
        super(...args);

        this.state = {
            isNavBarHidden: false,
            isSearchOpen: false
        };
        this.prevScrollY = 0;

        this.toggleSearchBar = this.toggleSearchBar.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.hideNavBar, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideNavBar);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { pinned, pinOffset, isSideMenuOpen } = this.props;
        const { isNavBarHidden, isSearchOpen } = this.state;
        const navbarChanged = nextState.isNavBarHidden !== isNavBarHidden;
        const searchChanged = nextState.isSearchOpen !== isSearchOpen;
        const pinChanged = nextProps.pinned !== pinned;
        const pinOffsetChanged = nextProps.pinOffset !== pinOffset;
        const sideMenuChanged = nextProps.isSideMenuOpen !== isSideMenuOpen;

        return navbarChanged || searchChanged || pinChanged || pinOffsetChanged || sideMenuChanged;
    }

    hideNavBar = throttle(() => {
        const { BREAKPOINT_SMALL_MAX, SCROLL_TOP_BOUNCE_ALLOWANCE } = Header.constants;
        const { scrollY, outerWidth } = window;

        if (scrollY === 0 || this.state.isSearchOpen) {
            this.setState({ isNavBarHidden: false });
        } else if (outerWidth < BREAKPOINT_SMALL_MAX && scrollY > SCROLL_TOP_BOUNCE_ALLOWANCE && scrollY > this.prevScrollY) {
            this.setState({ isNavBarHidden: true });
        } else {
            this.setState({ isNavBarHidden: false });
        }

        this.prevScrollY = scrollY;
    }, 50);

    toggleSearchBar = () => {
        this.setState(prevState => ({
            isSearchOpen: !prevState.isSearchOpen
        }));
    };

    render() {
        const {
            pinned, isSideMenuOpen, pinOffset, navItems
        } = this.props;
        const { isNavBarHidden, isSearchOpen } = this.state;
        const { config } = this.context;

        if (!navItems) return null;

        const className = classnames({
            header: true,
            'header--pinned': pinned,
            'header--side-menu-open': isSideMenuOpen,
            'header--fade-out': isNavBarHidden
        });
        const logoClassNames = classnames('header-logo__link-image', 'gtm-navbar-homes');
        const searchEnabled = get(config, 'features.search.enabled', false);
        const hasNavItems = Array.isArray(navItems) && navItems.length > 0;

        return (
            <div className="header-wrapper">
                <header
                  ref={(c) => { this.header = c; }}
                  className={className}
                  role="banner"
                  style={{ top: pinned ? `${pinOffset}px` : 'auto' }}
                >
                    <div>
                        <div className="header__sections container">
                            <MenuButton />

                            <div className="header-logo">
                                <a href="/" className={logoClassNames}>
Homes to Love
                                </a>
                            </div>

                            <Navigation
                              className="header-nav"
                              items={navItems}
                              linkClassName="gtm-navigation-section"
                            />

                            {
                                searchEnabled
                                && (
                                <HeaderSearch
                                  onSearchClick={this.toggleSearchBar}
                                  isSearchOpen={isSearchOpen}
                                  hasNavItems={hasNavItems}
                                />
)
                            }
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

/* eslint-disable no-unused-vars */
export default pin(Header, (props) => {
    const { UNIHEADER_HEIGHT } = Header.constants;
    return {
        small: { pinPoint: 0 },
        medium: { pinPoint: UNIHEADER_HEIGHT },
        large: { pinPoint: UNIHEADER_HEIGHT },
        xlarge: { pinPoint: UNIHEADER_HEIGHT }
    };
});

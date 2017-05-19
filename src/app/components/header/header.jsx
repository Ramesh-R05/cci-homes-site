import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MenuButton from './menuButton';
import Navigation from './navigation';
import pin from '@bxm/behaviour/lib/components/pin';
import throttle from 'lodash/function/throttle';

class Header extends Component {
    static propTypes = {
        pinned: PropTypes.bool,
        pinOffset: PropTypes.number,
        isSideMenuOpen: PropTypes.bool,
        navItems: PropTypes.array.isRequired
    };

    static defaultProps = {
        isSideMenuOpen: false,
        pinned: false
    };

    static constants = {
        UNIHEADER_HEIGHT: 49,
        BREAKPOINT_SMALL_MAX: 691,
        SCROLL_TOP_BOUNCE_ALLOWANCE: 10
    };

    constructor(props) {
        super(props);
        this.state = { isNavBarHidden: false };
        this.prevScrollY = 0;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.hideNavBar, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideNavBar);
    }

    hideNavBar = throttle(() => {
        const { BREAKPOINT_SMALL_MAX, SCROLL_TOP_BOUNCE_ALLOWANCE } = Header.constants;
        const { scrollY, outerWidth } = window;
        if (outerWidth < BREAKPOINT_SMALL_MAX && scrollY > SCROLL_TOP_BOUNCE_ALLOWANCE && scrollY > this.prevScrollY) {
            this.setState({ isNavBarHidden: true });
        } else {
            this.setState({ isNavBarHidden: false });
        }
        this.prevScrollY = scrollY;
    }, 50);

    render() {
        const { pinned, isSideMenuOpen, pinOffset, navItems } = this.props;
        const { isNavBarHidden } = this.state;

        if (!navItems) return null;

        const className = classnames({
            header: true,
            'header--pinned': pinned,
            'header--side-menu-open': isSideMenuOpen,
            'header--fade-out': isNavBarHidden
        });

        const logoClassNames = classnames('header-logo__link-image', 'gtm-navbar-homes');

        return (
            <div className="header-wrapper">
                <header
                  ref="header"
                  className={className}
                  role="banner"
                  style={{ top: pinned ? `${pinOffset}px` : 'auto' }}
                >
                    <div>
                        <div className="header__sections container">
                            <MenuButton />

                            <div className="header-logo">
                                <a href="/" className={logoClassNames}>Homes to Love</a>
                            </div>

                            <Navigation
                              className="header-nav"
                              items={navItems}
                              linkClassName="gtm-navigation-section"
                            />
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default pin(Header, (props) => {
    const { UNIHEADER_HEIGHT } = Header.constants;
    return {
        small: { pinPoint: 0 },
        medium: { pinPoint: UNIHEADER_HEIGHT },
        large: { pinPoint: UNIHEADER_HEIGHT },
        xlarge: { pinPoint: UNIHEADER_HEIGHT }
    };
});

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import MenuButton from './menuButton';
import Navigation from './navigation';
import pin from '../helpers/pin';

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

    render() {
        if (!this.props.navItems) return null;

        const className = classNames({
            'header': true,
            'header--pinned': this.props.pinned,
            'header--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <header
                    ref="header"
                    className={className}
                    role="banner"
                    style={{top: this.props.pinned ? `${this.props.pinOffset}px` : 'auto'}}>
                <div className="header-banner">
                    <a href="/">Homes to Love</a>
                </div>
                <div className="header__sections">
                    <MenuButton/>

                    <div className="header-logo">
                        <a href="/" className="header-logo__link-image">Homes to Love</a>
                    </div>

                    <Navigation
                        className="header-nav"
                        items={this.props.navItems}
                    />

                    {/*

                    --- Coppied from AWW ---

                    <div className="header-social">
                        <HeaderSocialLinks
                            facebook="https://www.facebook.com/WomensWeeklyMag"
                            twitter="https://twitter.com/womensweeklymag"
                            instagram="http://instagram.com/womensweeklymag"/>
                    </div>

                    <div className="header-search" role="search">
                        <SubscribeButton />

                        <SearchButton />
                    </div>

                    */}
                </div>
            </header>
        );
    }
}

export default pin(Header, {
    small: { pinPoint: 40 },
    medium: { pinPoint: 268 },
    large: { pinPoint: 268 },
    xlarge: { pinPoint: 268 }
});

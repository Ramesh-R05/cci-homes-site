import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import MenuButton from './menuButton';
import Navigation from './navigation';
import pin from '@bxm/behaviour/lib/components/pin';

class Header extends Component {
    static propTypes = {
        pinned: PropTypes.bool,
        pinOffset: PropTypes.number,
        isExpanded: PropTypes.bool,
        isSideMenuOpen: PropTypes.bool,
        navItems: PropTypes.array.isRequired
    };

    static defaultProps = {
        isExpanded: false,
        isSideMenuOpen: false,
        pinned: false
    };

    render() {
        if (!this.props.navItems) return null;

        const wrapperClassName = classnames({
            'header-wrapper': true,
            'header-wrapper--expanded': this.props.isExpanded
        });

        const className = classnames({
            'header': true,
            'header--expanded': this.props.isExpanded,
            'header--pinned': this.props.pinned,
            'header--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div className={wrapperClassName}>
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
            </div>
        );
    }
}

export default pin(Header, props =>
    props.isExpanded ? {
        small: { pinPoint: 40 },
        medium: { pinPoint: 268 },
        large: { pinPoint: 268 },
        xlarge: { pinPoint: 268 }
    } : {
        small: { pinPoint: 40 },
        medium: { pinPoint: 51 },
        large: { pinPoint: 51 },
        xlarge: { pinPoint: 51 }
    }
);

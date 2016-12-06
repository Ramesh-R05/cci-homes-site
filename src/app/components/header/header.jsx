import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import MenuButton from './menuButton';
import Navigation from './navigation';
import pin from '@bxm/behaviour/lib/components/pin';
import { SponsorsLinks } from './sponsorsLinks';

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

        const headerClass = this.props.isExpanded ? '' : 'header__sections--brick-bg';

        return (
            <div className={wrapperClassName}>
                <header
                        ref="header"
                        className={className}
                        role="banner"
                        style={{top: this.props.pinned ? `${this.props.pinOffset}px` : 'auto'}}>
                    <div className="header-banner">
                        <a href="/" className="header-banner__logo">Homes to Love</a>
                    </div>

                    {this.props.isExpanded ? <SponsorsLinks
                        expanded={this.props.isExpanded}
                        by="powered by" /> : null }

                    <div className={headerClass}>
                        <div className="header__sections">
                            <MenuButton/>

                            <div className="header-logo">
                                <a href="/" className="header-logo__link-image">Homes to Love</a>
                            </div>

                            <Navigation
                                className="header-nav"
                                items={this.props.navItems}
                                linkClassName="gtm-navigation-section"
                            />
                        </div>
                    </div>
                    <div>
                        {!this.props.isExpanded ? <SponsorsLinks
                            expanded={this.props.isExpanded}
                            by="powered by"
                            classNameModify="--text-only"
                            displayTextOnly={true} /> : null }
                    </div>
                </header>
            </div>
        );
    }
}

export default pin(Header, props =>
    props.isExpanded ? {
        small: { pinPoint: 40 },
        medium: { pinPoint: 241 },
        large: { pinPoint: 241 },
        xlarge: { pinPoint: 241 }
    } : {
        small: { pinPoint: 40 },
        medium: { pinPoint: 51 },
        large: { pinPoint: 51 },
        xlarge: { pinPoint: 51 }
    }
);

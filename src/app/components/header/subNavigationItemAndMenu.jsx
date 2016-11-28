import React, {PropTypes, Component} from 'react';

const isArray = Array.isArray;

export default class NavigationItem extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        linkClassName: PropTypes.string.isRequired,
        showGroupLabel: PropTypes.bool
    };

    static defaultProps = {
        showGroupLabel: true
    }

    getSubNavMenu() {

        const items = this.props.items;

        let subNavItems = items.map((item, i) =>
                <li><a className={this.props.linkClassName} href={'/tags/'+item.urlName}>{item.displayName}</a></li>
        );

        return subNavItems;
    }

    handleClick() {
        return false;
    }

    render() {
        const {
            items,
            linkClassName,
            name,
            showGroupLabel
        } = this.props;

        if (!isArray(items) || items.length === 0) return null;

        const groupLabel = (
            <a className={linkClassName} onClick={this.handleClick}>{name}
                <i className="tl-icon-drop-menu"></i>
            </a>
        );

        return (
            <div className='header-sub-nav'>
                {showGroupLabel ? groupLabel : null}
                <ul className='sub-nav-list__dropdown'>{this.getSubNavMenu()}</ul>
            </div>
         )

    }
}

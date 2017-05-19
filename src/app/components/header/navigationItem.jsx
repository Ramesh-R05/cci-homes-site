import React, { PropTypes, Component } from 'react';
import SubNavigationItemAndMenu from './subNavigationItemAndMenu';
import { canUseDOM } from 'exenv';

export default class NavigationItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        tagsDetails: PropTypes.array.isRequired,
        linkClassName: PropTypes.string.isRequired,
        showGroupLabel: PropTypes.bool
    };

    constructor(...args) {
        super(...args);
        this.state = { viewportSize: 0 };
    }

    componentDidMount() {
        if (canUseDOM) {
            this.setState({ viewportSize: window.innerWidth });
        }
    }

    hasSubMenuItemsToShow = () => (this.props.tagsDetails && this.props.tagsDetails.length > 1);

    render() {
        if (!this.props.name || !this.props.url) return null;

        if (!this.hasSubMenuItemsToShow()) {
            return <a className={this.props.linkClassName} href={this.props.url}>{this.props.name}</a>;
        }

        return (
            <SubNavigationItemAndMenu
              items={this.props.tagsDetails}
              name={this.props.name}
              linkClassName={this.props.linkClassName}
              showGroupLabel={this.props.showGroupLabel}
              viewportSize={this.state.viewportSize}
            />
        );
    }
}

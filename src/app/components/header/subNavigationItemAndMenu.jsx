import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'exenv';

const isArray = Array.isArray;

export default class NavigationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavStyles: {
                width: 0
            }
        };
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        linkClassName: PropTypes.string.isRequired,
        viewportSize: PropTypes.number.isRequired,
        showGroupLabel: PropTypes.bool
    };

    static defaultProps = {
        showGroupLabel: true
    };

    static constants = {
        BREAKPOINT_LARGE_MIN: 1024,
        SUB_NAV_WIDTH: 165
    };

    componentWillMount() {
        if (canUseDOM) {
            this.setState({ viewportSize: this.props.viewportSize });
        }
    }

    componentDidMount() {
        if (canUseDOM) {
            this.setState({ viewportSize: window.innerWidth });
            window.addEventListener('resize', this.processResizeEvent, false);
            this.determineNavLabelWidth();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.processResizeEvent);
    }

    processResizeEvent = () => {
        if (this.checkViewportSizeOnResize()) {
            this.setState({ viewportSize: window.innerWidth });
            this.determineNavLabelWidth();
        }
    };

    checkViewportSizeOnResize = () => {
        const { viewportSize } = this.state;
        const { innerWidth } = window;
        const { BREAKPOINT_LARGE_MIN } = NavigationItem.constants;
        return viewportSize >= BREAKPOINT_LARGE_MIN && innerWidth < BREAKPOINT_LARGE_MIN ||
            viewportSize < BREAKPOINT_LARGE_MIN && innerWidth > BREAKPOINT_LARGE_MIN;
    };

    determineNavLabelWidth = () => {
        if (ReactDOM.findDOMNode(this.subnav)) {
            const navLabelWidth = ReactDOM.findDOMNode(this.subnav).getBoundingClientRect().width;

            this.setState({
                subNavStyles: {
                    width: navLabelWidth
                }
            });
        }
    };

    getSubNavMenu = () => {
        const { items, linkClassName } = this.props;
        return items.map((item, i) => {
            const key = `${item.urlName}-${i}`;
            return (
                <li key={key}>
                    <a className={linkClassName} href={`/${item.urlName}`}>
                        {item.displayName}
                    </a>
                </li>
            );
        });
    };

    calculateLeftOffsetForNavLabel = () => {
        const { width } = this.state.subNavStyles;
        const { SUB_NAV_WIDTH } = NavigationItem.constants;
        const maxNavLabelWidthForOffset = 150;
        return width > maxNavLabelWidthForOffset || width === 0 ? 0 : -((SUB_NAV_WIDTH - width) / 2);
    };

    handleClick = (e) => {
        e.preventDefault();
    };

    render() {
        const { items, linkClassName, name, showGroupLabel } = this.props;

        const subNavStyles = {
            left: this.calculateLeftOffsetForNavLabel()
        };

        if (!isArray(items) || items.length === 0) return null;

        const groupLabel = (
            <a className={linkClassName} onClick={this.handleClick}>{name}
                <i className="tl-icon-drop-menu" />
            </a>
        );

        return (
            <div ref={(c) => { this.subnav = c; }} className="header-sub-nav">
                {showGroupLabel ? groupLabel : null}
                <ul className="sub-nav-list__dropdown" style={subNavStyles}>{this.getSubNavMenu()}</ul>
            </div>
        );
    }
}

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {canUseDOM} from 'exenv';

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
        showGroupLabel: PropTypes.bool,
        viewportSize: PropTypes.number
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
            this.setState({viewportSize: this.props.viewportSize});
        }
    }

    componentDidMount() {
        if (canUseDOM) {
            this.setState({viewportSize: window.innerWidth});
            window.addEventListener('resize', this.processResizeEvent, false);
            this.determineNavLabelWidth();
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.processResizeEvent);
    }

    processResizeEvent = () => {
        if (this.checkViewportSizeOnResize()) {
            this.setState({viewportSize: window.innerWidth});
            this.determineNavLabelWidth();
        }
    };

    checkViewportSizeOnResize = () => {
        let { viewportSize } = this.state;
        let { innerWidth } = window;
        let { BREAKPOINT_LARGE_MIN } = NavigationItem.constants;
        return  viewportSize >= BREAKPOINT_LARGE_MIN && innerWidth < BREAKPOINT_LARGE_MIN ||
            viewportSize < BREAKPOINT_LARGE_MIN && innerWidth > BREAKPOINT_LARGE_MIN;
    };

    determineNavLabelWidth = () => {
        if (ReactDOM.findDOMNode(this.refs.subnav)) {
            let navLabelWidth = ReactDOM.findDOMNode(this.refs.subnav).getBoundingClientRect().width;

            this.setState({
                subNavStyles: {
                    width: navLabelWidth
                }
            });
        }
    };

    getSubNavMenu = () => {
        const items = this.props.items;

        let subNavItems = items.map((item, i) =>
            <li key={i}><a className={this.props.linkClassName} href={'/'+item.urlName}>{item.displayName}</a></li>
        );

        return subNavItems;
    };

    calculateLeftOffsetForNavLabel = () => {
        let { width } = this.state.subNavStyles;
        let { SUB_NAV_WIDTH } = NavigationItem.constants;
        let maxNavLabelWidthForOffset = 150;
        return width > maxNavLabelWidthForOffset || width == 0 ? 0 : -((SUB_NAV_WIDTH - width)/2);
    };

    handleClick() {
        return false;
    }

    render() {
        const { items, linkClassName, name, showGroupLabel } = this.props;

        let subNavStyles = {
            left: this.calculateLeftOffsetForNavLabel()
        };

        if (!isArray(items) || items.length === 0) return null;

        const groupLabel = (
            <a className={linkClassName} onClick={this.handleClick}>{name}
                <i className="tl-icon-drop-menu"></i>
            </a>
        );

        return (
            <div ref='subnav' className='header-sub-nav'>
                {showGroupLabel ? groupLabel : null}
                <ul className='sub-nav-list__dropdown' style={subNavStyles}>{this.getSubNavMenu()}</ul>
            </div>
        )
    }
}

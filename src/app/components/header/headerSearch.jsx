import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import throttle from 'lodash/function/throttle';
import matchMedia from 'matchmedia';

export default class HeaderSearch extends Component {
    static displayName = 'HeaderSearch';

    static propTypes = {
        isSearchOpen: PropTypes.bool.isRequired,
        onSearchClick: PropTypes.func.isRequired,
        hasNavItems: PropTypes.bool
    };

    static defaultProps = {
        hasNavItems: true
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            searchTerm: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (canUseDOM) {
            this.setIconPosition();
            window.addEventListener('resize', this.handleResize, false);
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            window.removeEventListener('resize', this.handleResize);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const isOpenChanged = nextProps.isSearchOpen !== this.props.isSearchOpen;
        const searchClickChanged = nextProps.onSearchClick !== this.props.onSearchClick;
        const searchTermChanged = nextState.searchTerm !== this.state.searchTerm;
        const hasNavItemsChanged = nextProps.hasNavItems !== this.props.hasNavItems;

        return isOpenChanged || searchClickChanged || searchTermChanged || hasNavItemsChanged;
    }

    /* eslint-disable no-unused-vars */
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isSearchOpen) {
            this.setInputContainerWidth();
            this.input.focus();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const { searchTerm } = this.state;
        event.preventDefault();

        if (searchTerm !== '') {
            window.location.href = `/search/${searchTerm}`;
        }
    }

    /* eslint-disable no-unused-vars */
    handleResize = throttle((event) => {
        this.setIconPosition();
        if (this.props.isSearchOpen) {
            this.setInputContainerWidth();
        }
    }, 50);

    setInputContainerWidth() {
        const { config } = this.context;
        const isMobile = matchMedia(`(max-width: ${config.global.breakpoints.smallRangeMax})`).matches;

        if (isMobile) {
            const bodyWidth = parseInt(getComputedStyle(document.body).width, 10);
            const submitRect = this.submit.getBoundingClientRect();
            this.inputContainer.style.width = `${bodyWidth}px`;
            this.inputContainer.style.left = `-${bodyWidth - submitRect.width - 1}px`;
        }
    }

    setIconPosition() {
        const { config } = this.context;
        const isMediumUp = matchMedia(`(min-width: ${config.global.breakpoints.mediumRangeMin})`).matches;

        if (isMediumUp && !this.props.hasNavItems) {
            this.iconContainer.style.top = 0;
        }
    }

    render() {
        const { isSearchOpen, onSearchClick } = this.props;
        const divStyle = {
            display: isSearchOpen ? 'block' : 'none'
        };

        /* eslint-disable react/no-danger, max-len */
        return (
            <div className={`header-search ${isSearchOpen ? 'header-search__open' : ''}`}>
                <div className="header-search--icon-container" onClick={onSearchClick} ref={(c) => { this.iconContainer = c; }}>
                    <button
                      className="header-search--icon"
                      dangerouslySetInnerHTML={{
 __html: `
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 25.9 25.5" xml:space="preserve">
                        <path d="M25.3,21.8L17.6,14c0,0,0,0,0,0c0.8-1.4,1.2-2.9,1.2-4.6c0-5.2-4.2-9.4-9.4-9.4S0,4.2,0,9.4c0,5.2,4.2,9.4,9.4,9.4
                            c1.9,0,3.6-0.6,5.1-1.5l7.7,7.7c0.7,0.7,1.9,0.7,2.6,0l0.6-0.6C26.1,23.6,26.1,22.5,25.3,21.8z M9.4,15.1c-3.2,0-5.7-2.6-5.7-5.7
                            c0-3.2,2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7C15.1,12.5,12.5,15.1,9.4,15.1z"/>
                    </svg>
                    `
}}
                    />
                </div>
                <div className="header-search--input" style={divStyle} ref={(c) => { this.inputContainer = c; }}>
                    <form onSubmit={this.handleSubmit}>
                        <input
                          type="text"
                          name="searchTerm"
                          placeholder="Search..."
                          value={this.state.searchTerm}
                          onChange={this.handleInputChange}
                          ref={(c) => { this.input = c; }}
                        />
                        <input
                          type="image"
                          name="submit"
                          className="header-search--submit"
                          src="/assets/images/search-btn.png"
                          alt="Search"
                          onClick={this.handleSubmit}
                          ref={(c) => { this.submit = c; }}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

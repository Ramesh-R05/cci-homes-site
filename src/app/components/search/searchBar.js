import React, { Component } from 'react';

export default class SearchBar extends Component {

    static displayName = 'SearchBar';

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    shouldComponentUpdate = (nextProps, nextState) => this.state.searchTerm !== nextState.searchTerm;

    render() {
        return (
            <div className="search-bar">
                <div className="search-bar--input">
                    <form onSubmit={this.handleSubmit}>
                        <input
                          type="text" name="searchTerm" placeholder="Search..." value={this.state.searchTerm}
                          onChange={this.handleInputChange}
                        />
                        <input
                          type="image" name="submit" className="search-bar--submit"
                          src="/assets/images/search-btn.png" alt="Search" onClick={this.handleSubmit}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

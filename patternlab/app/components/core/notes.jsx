import React, {Component} from 'react';

export default class Notes extends Component {
    render() {
        return (
            <div className="patternlab-notes">
                <h4>Notes:</h4>
                {this.props.children}
            </div>
        );
    }
}

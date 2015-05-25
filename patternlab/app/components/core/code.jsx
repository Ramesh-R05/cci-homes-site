import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import Prism from 'prismjs';

export default class Code extends Component {
    componentDidMount() {
        Prism.highlightElement(this.refs.code.getDOMNode(), true);
    }

    render() {
        return (
            <pre>
                <code ref="code" className="language-markup">
                    {this.props.children}
                </code>
            </pre>
        );
    }
}

Code.propTypes = {
    value: PropTypes.string
};

import React, {Component, PropTypes} from 'react';
import Button from './button';

export default class ButtonCategory extends Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return (
            <Button {...this.props} modifier="category">
                {this.props.children}
                {/*Arrow icon*/}
                <span className="icon-arrow"
                      dangerouslySetInnerHTML={{__html: `
                      <svg class="arrow" preserveAspectRatio="xMidYMid" width="12" height="8" viewBox="0 0 12 8">
                        <path d="M5.773,6.730 C5.773,6.730 -0.001,1.408 -0.001,1.408 C-0.001,1.408 1.258,0.002 1.258,0.002 C1.258,0.002 5.773,4.165 5.773,4.165 C5.773,4.165 10.287,0.002 10.287,0.002 C10.287,0.002 11.546,1.408 11.546,1.408 C11.546,1.408 5.773,6.730 5.773,6.730 Z" id="path-1" class="cls-2" fill-rule="evenodd"/>
                      </svg>`}}>
                </span>
            </Button>
        );
    }
}

import React, {Component} from 'react';
import Input from './input';

export default class RadioButton extends Component {
    render() {
        return <Input {...this.props} type="radio" />;
    }
}

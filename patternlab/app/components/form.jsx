import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components
import RadioButton from '../../../app/components/form/radioButton';
import Checkbox from '../../../app/components/form/checkbox';
// Test data
import {radio1 as radio1Props, radio2 as radio2Props, checkbox as checkboxProps} from '../../../tests/mock/input';

export default class Form extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Form components</h1>

                {/* RadioButton */}
                <h2 id="radioButton" className="heading2">RadioButton<br />
                    <small className="file-path">components/form/radioButton</small></h2>
                <RadioButton {...radio1Props} checked={true}>{radio1Props.label}</RadioButton>
                <RadioButton {...radio2Props}>{radio2Props.label}</RadioButton>
                <Code>
                    {`<RadioButton checked={true} name="size" id="size__1" onChange={doSomething()} value='small'>Small</RadioButton>`}
                </Code>
                <Notes>
                    <ul>
                        <li>You must provide a <code>name</code>, <code>id</code> and <code>value</code>.</li>
                        <li><code>checked</code> is set to false by default.</li>
                        <li><code>onChange</code> is a callback function that is fired when the radio button is selected. It returns the value of the radio button.</li>
                    </ul>
                </Notes>

                {/* Checkbox */}
                <h2 id="checkbox" className="heading2">Checkbox<br />
                    <small className="file-path">components/form/checkbox</small></h2>
                <Checkbox {...checkboxProps}>{checkboxProps.label}</Checkbox>
                <Code>
                    {`<Checkbox checked={false} name="checkMe" id="checkMe" onChange={doSomething()} value='check me'>Check me!</Checkbox>`}
                </Code>
                <Notes>
                    <p>It has the same properties as the <b>RadioButton</b> component.</p>
                </Notes>

            </div>
        );
    }
}

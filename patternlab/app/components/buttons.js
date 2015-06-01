import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components
import Button from '../../../app/components/buttons/button';
import ButtonCategory from '../../../app/components/buttons/buttonCategory';

export default class Examples extends Component {
    onButtonClick(e, value, active) {
        React.findDOMNode(this.refs.button3).innerHTML = active ? 'Active' : 'Inactive';
    }

    render() {
        return (
            <div>
                <h1 className='heading1'>Buttons</h1>

                {/* Button */}
                <h2 id="button" className="heading2">Button<br />
                    <small className="file-path">components/buttons/button</small></h2>
                <Button>Button</Button>
                <Code>
                    {`<Button>Text</Button>`}
                </Code>
                <Button
                    ref="button3"
                    persistActiveState={true}
                    onClick={this.onButtonClick.bind(this)}>
                    State change
                </Button>
                <Code>
                    {`<Button persistActiveState={true} \n onClick={this.onButtonClick.bind(this)}>State change</Button>`}
                </Code>
                <Button disabled={true}>Disabled</Button>
                <Code>
                    {`<Button disabled={true}>Disabled</Button>`}
                </Code>
                <Notes>
                    <ul>
                        <li><code>active</code> ads the <code>.active</code> class on the button. Set to false by default.</li>
                        <li><code>disabled</code> is set to false by default.</li>
                        <li><code>modifier</code>BEM modifier.</li>
                        <li><code>onClick</code> returns the event, the value and the current state.</li>
                        <li><code>persistActiveState</code> will persist the active class if set to true</li>
                        <li><code>type</code> is the button type. Set to 'button' by default.</li>
                        <li><code>value</code> is the value property of the button. Set to an empty string by default.</li>
                    </ul>
                </Notes>

                {/* ButtonCategory */}
                <h2 id="buttonCategory" className="heading2">ButtonCategory<br />
                    <small className="file-path">components/buttons/buttonCategory</small></h2>
                <ButtonCategory persistActiveState={true}>Homes Type</ButtonCategory>
                <Code>
                    {`<ButtonCategory persistActiveState={true}>Homes Type</ButtonCategory>`}
                </Code>
                <Notes>
                    <p>It has the same props as the <b>Button</b> component.</p>
                 </Notes>

            </div>
        );
    }
}

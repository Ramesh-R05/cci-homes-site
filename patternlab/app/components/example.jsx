import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components
import Example from '../../../app/components/example/example';
// Test data
//import {entity as article} from '../../../../tests/mock/article';


export default class Examples extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Example components</h1>

                {/* Example */}
                <h2 id="quote" className="heading2">Example<br />
                    <small className="file-path">components/example/example</small></h2>
                <Example title="A at ea eum ipsa nesciunt perferendis quidem ratione" />
                <Notes>
                    <p>Write notes about your components if necessary. You can also highlight code like this <code>this.props</code>.
                        This is a test component. Let's replace this with actual components once we built some.</p>
                </Notes>
                <Code>
                    {`<Example title="A at ea eum ipsa nesciunt perferendis quidem ratione" />`}
                </Code>

            </div>
        );
    }
}

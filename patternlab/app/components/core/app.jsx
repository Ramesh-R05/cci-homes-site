import React from 'react';
import {provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';
import Nav from './nav/nav';
import NavButton from './nav/button';
import Overlay from './overlay';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isNavOpened: false
        };
    }

    onNavButtonClick() {
        this.setState({
            isNavOpened: !this.state.isNavOpened
        });
    }

    render() {
        let Handler = this.props.currentRoute.get('handler');

        return (
            <div>
                <Nav
                    opened={this.state.isNavOpened}
                    onClick={this.onNavButtonClick.bind(this)}
                />
                <Overlay opened={this.state.isNavOpened} />
                <NavButton
                    opened={this.state.isNavOpened}
                    onClick={this.onNavButtonClick.bind(this)}
                />

                <main className='main'>
                    <Handler />
                </main>
            </div>
        );
    }
}

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;

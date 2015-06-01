import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';
import Nav from './nav/nav';
import NavButton from './nav/button';
import Overlay from './overlay';
import platform from '@bxm/ui/lib/common/platform';
import classnames from 'classnames';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isNavOpened: false
        };

        if (canUseDOM) platform.set(navigator.userAgent);
    }

    onNavButtonClick() {
        this.setState({
            isNavOpened: !this.state.isNavOpened
        });
    }

    render() {
        const Handler = this.props.currentRoute.get('handler');
        const mainClasses = classnames('main', {'main--opened': this.state.isNavOpened});

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

                <main className={mainClasses}>
                    <Handler />
                </main>
            </div>
        );
    }
}

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;

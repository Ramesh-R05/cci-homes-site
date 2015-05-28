import React, {Component, PropTypes} from 'react';
import PageStore from '../stores/page';
import {connectToStores, provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';

class Application extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate(prevProps) {
        let newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }

    render() {
        const Handler = this.props.currentRoute.get('handler');
        return <Handler/>;
    }
}

Application.propTypes = {
    currentRoute: PropTypes.object
};

Application.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

Application = connectToStores(Application, [PageStore], (stores) => {
    return {
        PageStore: stores.PageStore.getState()
    };
});

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;

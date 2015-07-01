import React from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <h1>{this.props.title}</h1>;
    }
}

Home = connectToStores(Home, [EntityStore], (stores) => {
    return {
        title: stores.EntityStore.getTitle()
    };
});

Home.propTypes = {
    title: React.PropTypes.string
};

Home.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default Home;

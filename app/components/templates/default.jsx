import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';


class DefaultTemplate extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (typeof this.props.content === 'undefined') return null;

        const Handler = this.getComponent(this.props.content.nodeType);

        if (!Handler)return null;

        return <Handler content={this.props.content}/>;
    }

    getComponent(nodeType) {
        switch (nodeType) {
            case 'Homepage':
                return require('../home/home');
            case 'HomesArticle':
                return require('../article/section');
            case 'NavigationSection':
                return require('../section/section');
            default:
                console.error({message: 'NotFound is not implemented'});
                return null;
        }
    }
}

DefaultTemplate.propTypes = {
    content: PropTypes.object
};

DefaultTemplate.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

DefaultTemplate = connectToStores(DefaultTemplate, [EntityStore], (stores) => {
    return {
        content: stores.EntityStore.getContent()
    };
});

export default DefaultTemplate;
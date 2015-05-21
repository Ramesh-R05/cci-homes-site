import React from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';

class Article extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.nodeType}</h2>
            </div>
        );
    }

}

Article = connectToStores(Article, [EntityStore], (stores) => {
    return {
        title: stores.EntityStore.getTitle(),
        nodeType: stores.EntityStore.getNodeType()
    };
});

Article.propTypes = {
    title: React.PropTypes.string,
    nodeType: React.PropTypes.string
};

Article.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default Article;

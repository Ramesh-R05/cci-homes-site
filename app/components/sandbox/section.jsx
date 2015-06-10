import React from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import TaggedArticlesStore from '../../stores/facetedStores/taggedArticles';
import * as facetedModuleActions from '../../actions/facetedModule.js';

class SandboxSection extends React.Component {

    constructor(props, context) {
        super(props);
    }

    componentDidMount(){
        console.log('[SandboxSection][componentDidMount]', this.props);
    }

    componentWillMount() {
        console.log('[SandboxSection][componentWillMount]');
        this.context.executeAction(facetedModuleActions.getPage, {
            page: 0,
            params: {tags: ['Indoor']},
            moduleConfig: this.props.moduleConfig
        })
    }

    getState() {
        console.log('[SandboxSection][getState]');
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

SandboxSection.propTypes = {
    title: React.PropTypes.string,
    nodeType: React.PropTypes.string
};

SandboxSection.contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};

SandboxSection = connectToStores(SandboxSection, [EntityStore, TaggedArticlesStore], (stores) => {
    console.log('[SandboxSection][connectToStores]');
    return {
        title: stores.EntityStore.getTitle(),
        nodeType: stores.EntityStore.getNodeType(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration()
    };
});

export default SandboxSection;

import React from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import platform from '@bxm/ui/lib/common/platform';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

class DefaultTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (canUseDOM) {
            platform.set(navigator.userAgent);
        }
    }

    render() {
        if (typeof this.props.content === 'undefined') {
            // TODO (davidg): We don't really want this to fire on every render.
            return null;
        }

        let Handler = this.getComponent(this.props.content.nodeType);

        if (Handler == null) { // dang: break if no handler is found to stop the app crashing
            return null;
        }

        return (
          <Handler content={this.props.content}/>
        );
    }

    getComponent(nodeType:String) {
        switch (nodeType) {
            case 'Homepage':
                return require('../home/home');
            case 'HomesArticle':
                return require('../article/section');
            case 'Section':
                return require('../section/section');
            default:
                console.error({message: 'NotFound is not implemented'});
                return null;
        }
    }
}

DefaultTemplate.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

DefaultTemplate = connectToStores(DefaultTemplate, [EntityStore], (stores) => {
    return {
        content: stores.EntityStore.getContent()
    };
});

export default DefaultTemplate;

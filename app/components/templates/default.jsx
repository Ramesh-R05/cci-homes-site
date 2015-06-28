import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import NetworkHeader from '@bxm/header/lib/header/header';
import {isUndefined} from 'lodash/lang';

class DefaultTemplate extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (isUndefined(this.props.content)) return null;

        const page = this.getPageMetadata();
        if (!page) return null;

        const {Handler, hideNetworkHeader} = page;
        return (
            <div>
                {hideNetworkHeader ? null : <NetworkHeader/>}
                <Handler content={this.props.content}/>
            </div>
        );
    }

    getPageMetadata() {
        switch (this.props.content.nodeType) {
            case 'Homepage': return {
                Handler: require('../home/home')
            };
            case 'HomesArticle': return {
                Handler: require('../article/section')
            };
            case 'NavigationSection': return {
                Handler: require('../section/section')
            };
            case 'Gallery': return {
                Handler: require('../gallery/gallery'),
                hideNetworkHeader: true
            };
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

export default connectToStores(DefaultTemplate, [EntityStore], (stores) => {
    return {
        content: stores.EntityStore.getContent()
    };
});

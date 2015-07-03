import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import GalleryHeader from '@bxm/gallery/lib/components/galleryHeader';
import GalleryActionCreators from '@bxm/gallery/lib/actions/gallery';

class Gallery extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.context.executeAction(GalleryActionCreators.initialize, {
            galleryTitle: this.props.title,
            items: this.props.items
        });
    }

    render() {
        return (
            <div>
                <GalleryHeader title={this.props.title}/>
            </div>
        );
    }
}

Gallery.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

Gallery.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

export default connectToStores(Gallery, [GalleryStore, EntityStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        title: stores.EntityStore.getTitle(),
        items: stores.GalleryStore.getItems()
    };
});

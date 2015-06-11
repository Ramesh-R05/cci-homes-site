import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import Article from './article';
import Feed from '../feed/feed';

class Section extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {title, content} = this.props;

        // Hero data
        const {imageUrl, imageAltText, imageCaption, video} = this.props.content;
        const heroItem = {imageUrl, imageAltText, imageCaption, video};

        // Article data
        const {body, source, summary, articleTags} = content;

        // TODO (thatzi): strings set temporary until credits are set up in CMS
        const credits = {
            writer: 'John Doe',
            photographer: 'Julia Smith',
            stylist: 'Julie Brooks',
            experter: 'Andrew White'
        };

        return (
            <div>
                <div className="main-wrapper article-section container row">
                    <Article
                        title={title}
                        heroItem={heroItem}
                        contentBody={body}
                        source={source}
                        summary={summary}
                        tags={articleTags}
                        credits={credits}/>

                    <Feed/>
                </div>
            </div>
        );
    }

}

Section = connectToStores(Section, [EntityStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        title: stores.EntityStore.getTitle()
    };
});

Section.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    nodeType: PropTypes.string
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

export default Section;

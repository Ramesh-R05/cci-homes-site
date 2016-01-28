import {PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import ArticleSection from '@bxm/article/lib/article';
import getCategoryFirstTag from '@bxm/tags/lib/utils/getCategoryFirstTag';
import theme from '../helpers/theme';
import * as getArticlePage from '@bxm/article/lib/actions/getArticleFeed';

class Section extends ArticleSection {
    static displayName = 'ArticleSection';

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    componentWillMount() {
        const tags = this.props.content.tags;
        const navigationTag = getCategoryFirstTag(tags, 'Homes navigation');
        this.context.executeAction(getArticlePage.getArticleFeed, {
            page: 0,
            params: { tags: [navigationTag] },
            moduleConfig: this.props.feedModuleConfig
        });
    }
}

Section = connectToStores(Section, ['articleStore'], (context) => {
    return {
        content: context.getStore('articleStore').getContent(),
        feedModuleConfig: context.getStore('articleStore').getConfiguration(),
        feedItems: context.getStore('articleStore').getItems()
    };
});

export default theme(Section, 'content.source');

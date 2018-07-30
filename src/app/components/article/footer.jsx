import React, { Component, PropTypes } from 'react';
import MainFooter from '../footer/footer';

export default class Footer extends Component {
    static displayName = 'ArticleFooter';

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        return <MainFooter config={this.context.config.get('localeData')} iframeKey="articlefooter" modifier="article" />;
    }
}

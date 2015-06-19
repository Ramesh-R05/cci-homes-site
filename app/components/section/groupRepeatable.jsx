import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import chunk from 'lodash/array/chunk';


export default class GroupRepeatable extends Component {
    render() {
        const {articles} = this.props;

        if (!articles.length) return null;

        const groups = chunk(articles, 9);

        return (
            <div>
                {groups.map((groupArticles, index) => {
                    return (
                        <section key={index} className="section--9-items">
                            {groupArticles.slice(0, 2).map(item => <Teaser {...item} key={item.id} />)}
                            <div className="ad ad--mrec ad--lg">
                                <div className="fake-ad"/>
                            </div>
                            {groupArticles.slice(2, 3).map(item => <Teaser {...item} key={item.id} />)}
                            <div className="ad ad--mrec ad--sm-md-xl">
                                <div className="fake-ad"/>
                            </div>
                            {groupArticles.slice(3, 7).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}
                            {groupArticles.slice(7, 9).map(item => <Teaser {...item} key={item.id} modifier="img-top" sizes="small-hero" />)}
                        </section>
                    );
                })}
            </div>
        );
    }
}

GroupRepeatable.propTypes = {
    articles: PropTypes.array.isRequired
};

GroupRepeatable.defaultProps = {
    articles: []
};

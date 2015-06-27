import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import classnames from 'classnames';

export default class Group extends Component {
    render() {
        const {articles, className, modifier, teaserModifier} = this.props;

        if (!articles.length || !modifier) return null;

        const classNames = classnames(`section--${modifier}`, className);

        return (
            <section className={classNames}>
                {articles.map(item => <Teaser {...item} key={item.id} modifier={teaserModifier} />)}
                {this.props.children}
            </section>
        );
    }
}

Group.propTypes = {
    articles: PropTypes.array.isRequired,
    className: PropTypes.string,
    children: PropTypes.any,
    modifier: PropTypes.string.isRequired,
    teaserModifier: PropTypes.string
};

Group.defaultProps = {
    articles: [],
    modifier: '',
    teaserModifier: 'img-left'
};

import React, { Component, PropTypes } from 'react';
import PolarTeaser from '../polar/polarTeaser';
import Teaser from '../teaser/teaser';
import classnames from 'classnames';
import get from 'lodash/object/get';

export default class Group extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        className: PropTypes.string,
        children: PropTypes.any,
        modifier: PropTypes.string.isRequired,
        polarAd: PropTypes.shape({
            label: PropTypes.string,
            index: PropTypes.number
        }),
        teaserModifier: PropTypes.string
    };

    static defaultProps = {
        articles: [],
        modifier: '',
        teaserModifier: 'img-left'
    };

    getTeasers() {
        const { polarAd, teaserModifier } = this.props;

        return this.props.articles.map((item, index) => {
            if (get(polarAd, 'index') === index) {
                return (
                    <PolarTeaser
                      {...item}
                      ad={{
                          label: polarAd.label,
                          targets: {
                              kw: polarAd.label
                          }
                      }}
                      key={item.id}
                      modifier={teaserModifier}
                    />
                );
            }
            return <Teaser {...item} key={item.id} modifier={teaserModifier} />;
        });
    }

    render() {
        const { articles, className, modifier } = this.props;

        if (!articles.length || !modifier) return null;

        const classNames = classnames(`section--${modifier}`, className);

        let subsection;
        if (this.props.children) {
            subsection = <div className="section__children">{this.props.children}</div>;
        }

        return (
            <section className={classNames}>
                {this.getTeasers()}
                {subsection}
            </section>
        );
    }
}

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import get from 'lodash.get';
import Ad from '@bxm/ad/lib/google/components/ad';
import Teaser from '../teaser/teaser';
import Rail from './rail';

export default class List extends Component {
    static displayName = 'List';

    static propTypes = {
        items: PropTypes.array,
        content: PropTypes.object.isRequired,
        polarTargets: PropTypes.array
    };

    static defaultProps = {
        items: [],
        polarTargets: []
    };

    render() {
        const { items, content, polarTargets } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <div className="row">
                <section className="section__list columns small-12 large-8">
                    <div className="row">
                        <Ad
                            className="ad--section-mrec teaser hide-for-large-up"
                            displayFor={['small', 'medium']}
                            sizes={{
                                small: 'mrec',
                                medium: 'mrec'
                            }}
                            label={{ active: false }}
                            pageLocation={Ad.pos.body}
                        />
                        {items.map((item, i) => {
                            const polarDetails = polarTargets.find(slot => slot.index === i);
                            const sections = ['navigationsection', 'campaign', 'tagsection'];
                            const lc = get(content, 'nodeType', '').toLowerCase();
                            let section = null;

                            const teaserClass = classNames('section__list-teaser', 'columns', 'small-12', 'medium-6', 'large-12', {
                                'section__list-polar-teaser': polarDetails
                            });

                            switch (lc) {
                                case 'brandsection':
                                    section = 'brand';
                                    break;
                                case 'homepage':
                                case 'search':
                                    section = lc;
                                    break;
                                default:
                                    section = sections.indexOf(lc) > -1 ? 'index' : null;
                            }

                            return (
                                <Teaser
                                    {...item}
                                    polar={polarDetails}
                                    key={item.id}
                                    sizes="brand-list"
                                    modifier="img-left"
                                    gtmClass={`gtm-bottomteaserlist-${section}`}
                                    className={teaserClass}
                                />
                            );
                        })}

                        <Ad
                            className="ad--section-mrec"
                            displayFor="medium"
                            sizes={{
                                medium: 'mrec'
                            }}
                            label={{ active: false }}
                            pageLocation={Ad.pos.body}
                        />
                    </div>
                </section>
                <Rail marginBottom={70} yPosition={95} />
            </div>
        );
    }
}

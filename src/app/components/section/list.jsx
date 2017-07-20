import React, { Component, PropTypes } from 'react';
import Teaser from '../teaser/teaser';
import Rail from './rail';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class List extends Component {

    static displayName = "List"

    static propTypes = {
        items: PropTypes.array,
        index: PropTypes.number,
        content: PropTypes.object.isRequired,
        polarTargets: PropTypes.array
    };

    static defaultProps = {
        items: [],
        polarTargets: []
    };

    render() {
        const { items, index, content, polarTargets } = this.props;

        if (items.length === 0) return null;

        return (
            <div className="section__row">
                <section className="section__list">
                    <Ad
                      className="ad--section-mrec teaser"
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
                        const lc = content.nodeType.toLowerCase();

                        let section = null;

                        switch (lc) {
                        case 'brandsection':
                            section = 'brand';
                            break;
                        case 'homepage':
                            section = lc;
                            break;
                        default:
                            section = sections.indexOf(lc) > -1 ? 'index' : null;
                        }

                        return <Teaser polar={polarDetails} {...item} key={item.id} sizes="brand-list" modifier="img-left" gtmClass={`gtm-bottomteaserlist-${section}`} />;
                    })}

                    <Ad
                      className="ad--section-mrec teaser"
                      displayFor="medium"
                      sizes={{
                          medium: 'mrec'
                      }}
                      label={{ active: false }}
                      pageLocation={Ad.pos.body}
                    />
                </section>

                <Rail
                  marginBottom={70}
                  yPosition={95}
                />

            </div>


        );
    }
}

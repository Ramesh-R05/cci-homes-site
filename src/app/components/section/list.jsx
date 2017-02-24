import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import Rail from './rail';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class List extends Component {

    static propTypes = {
        items: PropTypes.array,
        index: PropTypes.number,
        content: PropTypes.object.isRequired
    };

    static defaultProps = {
        items: []
    };

    render() {
        const {items, index, content} = this.props;
        let adPosition = (index + 1) * 2 + 1;

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
                        targets={{position: adPosition}}
                    />
                    {items.map(item => {

                        const sections = ['navigationsection', 'campaign', 'tagsection'];
                        const lc = content.nodeType.toLowerCase();

                        let section = null;

                        switch(lc){
                            case 'brandsection':
                                section = 'brand';
                                break;
                            case 'homepage':
                                section = lc;
                                break;
                             default:
                                section = sections.indexOf(lc) > -1 ? 'index' : null;
                        }

                        return <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-left" gtmClass={`gtm-bottomteaserlist-${section}`} />
                    })}
                    <Ad
                        className="ad--section-mrec teaser"
                        displayFor="medium"
                        sizes={{
                            medium: 'mrec'
                        }}
                        targets={{position: adPosition + 1}}
                    />
                </section>

                <Rail
                    adPosition={adPosition}
                    marginBottom={70}
                    yPosition={95}
                />

            </div>


        );
    }
}

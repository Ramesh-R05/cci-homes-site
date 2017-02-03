import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import Rail from './rail';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class List extends Component {

    static propTypes = {
        items: PropTypes.array,
        index: PropTypes.number
    };

    static defaultProps = {
        items: []
    };

    render() {
        const {items, index} = this.props;
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
                    {items.map(item => <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-left"  />)}
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

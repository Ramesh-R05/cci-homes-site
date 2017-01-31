import React, { Component, PropTypes } from 'react';
import Title from '@bxm/article/lib/components/teaser/title';
import Summary from '@bxm/article/lib/components/teaser/summary';
import Icon from '../teaser/icon';
import Sponsor from './sponsor';
import cx from 'classnames';

export default class PolarTeaserImage extends Component {

    static propTypes = {
        id: PropTypes.string,
        caption: PropTypes.string,
        modifier: PropTypes.string,
        nativeAd: PropTypes.object,
        trackClick: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        id: '',
        ad: {},
        modifier: 'img-left',
        trackClick: () => {}
    };

    render() {
        const ad = this.props.nativeAd;
        const gtmClass = this.props.id ? `gtm-native-${this.props.id}` : '';
        const classNames = cx('teaser', `teaser--${this.props.modifier}`, 'teaser--native', this.props.className);

        ad.image.href = ad.image.href.replace(/\&w=\d+/, '&w=360').replace(/\&h=\d+/, '&h=300');

        return (
            <article className={classNames} onClick={this.props.trackClick}>
                <a href={ad.link} className={`teaser__image ${gtmClass}`}>
                    <img src={ad.image.href} alt={ad.image.caption} />
                    <Icon icon={ad.custom.icon} />
                </a>
                <div className="teaser__content">
                    <Sponsor name={ad.sponsor.name} caption={this.props.caption}/>
                    <Title title={ad.title} url={ad.link} gtmClass={gtmClass} />
                    <Summary summary={ad.summary} />
                </div>
            </article>
        );
    }
}

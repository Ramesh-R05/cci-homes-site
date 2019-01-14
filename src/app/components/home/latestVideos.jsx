import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Teaser from '@bxm/teaser/lib/components/teaser';

export default class LatestVideos extends Component {
    static displayName = 'LatestVideos';

    static propTypes = {
        videoList: PropTypes.array,
        title: PropTypes.string
    };

    static defaultProps = {
        videoList: [],
        title: ''
    };

    render() {
        const { videoList, title } = this.props;
        const imageSizes = {
            s: { w: 320, h: 264 },
            m: { w: 400, h: 330 },
            l: { w: 410, h: 340 },
            xl: { w: 360, h: 300 }
        };

        if (videoList.length === 0) {
            return null;
        }

        return (
            <div className="latest-videos">
                {title && (
                    <div className="latest-videos__title-container">
                        <span className="latest-videos__title">{title}</span>
                    </div>
                )}
                <ul className="latest-videos__list">
                    {videoList.map(item => (
                        <li className="latest-videos__item">
                            <Teaser id={item.id} article={item} key={item.id} imageSizes={imageSizes} showResponsiveImage showBrandLogo />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

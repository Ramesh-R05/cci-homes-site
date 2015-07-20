import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {

    static displayName = 'TeaserIcon';

    static propTypes = {
        icon: PropTypes.string,
        nodeType: PropTypes.string,
        video: PropTypes.object
    };

    static defaultProps = {
        icon: '',
        nodeType: ''
    };

    static videoIconSvg = `
    <svg class="icon-video" viewBox="0 0 30 30">
    <path id="path-1" d="M7.7,2.8l20.5,12.7L7.7,28.3L7.7,2.8 M7.7,1C7.4,1,7.1,1.1,6.8,1.2C6.3,1.5,5.9,2.2,5.9,2.8l0,25.5
        c0,0.7,0.4,1.3,0.9,1.6c0.3,0.2,0.6,0.2,0.9,0.2c0.3,0,0.7-0.1,0.9-0.3l20.5-12.7c0.5-0.3,0.8-0.9,0.8-1.5c0-0.6-0.3-1.2-0.8-1.5
        L8.6,1.3C8.4,1.1,8,1,7.7,1L7.7,1z"/>
    </svg>`;

    static galleryIconSvg = `
    <svg class="icon-gallery" viewBox="0 0 30 30">
    <path id="path-1" d="M27.2,28H2.6C1.4,28,0,26.7,0,25V9c0-2,1.9-3,2.8-3h4.3l2.3-4h11.3l2.3,4h4.3C29.1,6,30,8,30,9v16
        C30,26.6,28.5,28,27.2,28z M28.1,9c0-0.1-0.3-1-0.9-1h-4.3h-1.1l-0.5-1l-1.7-3h-9.2L8.7,7L8.2,8H7.1H2.8C2.7,8,1.9,8.3,1.9,9v16
        c0,0.5,0.5,1,0.7,1h24.6c0.3,0,0.9-0.6,0.9-1V9z M15,23c-3.6,0-6.6-3.1-6.6-7c0-3.9,2.9-7,6.6-7s6.6,3.1,6.6,7
        C21.6,19.9,18.6,23,15,23z M15,11c-2.6,0-4.7,2.2-4.7,5c0,2.8,2.1,5,4.7,5s4.7-2.2,4.7-5C19.7,13.2,17.6,11,15,11z"/>
    </svg>`;

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {icon, nodeType, video} = this.props;
        let iconHtml;

        if (video || icon === 'video') {
            iconHtml = Icon.videoIconSvg;
        } else if (nodeType.toLowerCase() === 'gallery' || icon === 'gallery') {
            iconHtml = Icon.galleryIconSvg;
        } else {
            return null;
        }

        return (
            <div className="teaser__icon"
                 dangerouslySetInnerHTML={{__html: iconHtml}}>
            </div>
        );
    }
}

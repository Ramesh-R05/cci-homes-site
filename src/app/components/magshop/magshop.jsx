import React, { Component, PropTypes } from 'react';

export default class MagShop extends Component {
    static displayName = 'MagShop';

    static propTypes = {
        content: PropTypes.object.isRequired,
        inSideNav: PropTypes.bool
    };

    static defaultProps = {
        inSideNav: false
    };

    fireEvent = () => {
        window.dataLayer.push({ event: 'subscribe.click' });
    };

    render() {
        const { inSideNav, content } = this.props;
        const magshopHeading = content.magshopHeading;
        const magshopText = content.magshopText;
        const magshopUrl = content.magshopUrl;
        const magshopCoverImage = content.magshopCoverImage;
        const magshopCoverAltText = content.magshopCoverAltText;

        /* eslint-disable quotes */
        const magshop = !inSideNav ? (
            <div className="xlarge-6 columns show-for-xlarge">
                <a href={magshopUrl} target="_blank" onClick={this.fireEvent}>
                    <img src={`/assets/images/${magshopCoverImage}`} alt={magshopCoverAltText} />
                </a>
            </div>
        ) : null;
        /* eslint-enable quotes */

        const xLargeGridClass = !inSideNav ? 'xlarge-6' : '';

        return (
            <div className="magshop">
                <div className="row">
                    {magshop}
                    <div className={`small-12 ${xLargeGridClass} columns`}>
                        <div className="magshop__subscribe">
                            <h4 className="magshop__heading">{magshopHeading}</h4>
                            <p className="magshop__content">{magshopText}</p>
                            <p className="magshop__action">
                                <a className="button button--link button--subscribe" href={magshopUrl} target="_blank" onClick={this.fireEvent}>
                                    Subscribe
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, {Component} from 'react';

export default class FooterMagShop extends Component {

    constructor(props, context) {
        super(props, context);
    }

    fireEvent = () => {
        window.dataLayer.push({event: 'subscribe.click'});
    }

    render() {
        const url = 'https://www.magshop.com.au/store/homestolove';
        return (
            <div className="magshop">
                <div className="row">
                    <div className="xlarge-6 xxlarge-6 columns hide-for-large hide-for-medium hide-for-small">
                        <a href={url} target="_blank" onClick={this.fireEvent}>
                            <img src="/assets/images/magazines.png" alt="Women's Weekly Cookbooks" />
                        </a>
                    </div>
                    <div className="small-12 medium-12 large-12 xlarge-6 xxlarge-6 columns">
                        <div className="magshop__subscribe">
                            <h4 className="magshop__heading">More ways to read</h4>
                            <p className="magshop__content">
                                Subscribe to our homes mags to gain access to more inspiring homes and gardens, plus renovating, decorating, food and travel stories.
                            </p>
                            <p className="magshop__action">
                                <a className="button button--link button--subscribe" href={url} target="_blank" onClick={this.fireEvent}>
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

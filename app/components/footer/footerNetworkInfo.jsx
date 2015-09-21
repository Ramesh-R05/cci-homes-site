import React, {Component} from 'react';

export default class FooterNetworkInfo extends Component {
    constructor(...args) {
        super(...args);
    }

    fireEvent = () => {
        window.dataLayer.push({event: 'click:brandlink'});
    };

    render() {
        return (
            <div className="network-info">
                <h4>Content supported by</h4>
                <div className="network-info__supported-content">
                    <a className="network-info__belle" href="/belle/" onClick={this.fireEvent}>
                         <img src="/assets/svgs/belle.svg" alt="Belle"/>
                    </a>
                    <a className="network-info__real-living" href="/real-living/" onClick={this.fireEvent}>
                        <img src="/assets/svgs/realliving.svg" alt="Real Living"/>
                    </a>
                    <div className="network-info__separator" />
                    <a className="network-info__homes" href="/homes-plus/" onClick={this.fireEvent}>
                        <img src="/assets/svgs/homesplus.svg" alt="Homes+"/>
                    </a>
                    <a className="network-info__house-and-garden" href="/australian-house-and-garden/" onClick={this.fireEvent}>
                        <img src="/assets/svgs/housegarden.svg" alt="House & Garden"/>
                    </a>
                </div>
            </div>
        );
    }
}

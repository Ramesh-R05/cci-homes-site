import React, {Component} from 'react';

export default class FooterNetworkInfo extends Component {
    constructor(...args) {
        super(...args);
    }

    fireEvent = () => {
        window.dataLayer.push({event: 'click:brandlink'});
    }

    render() {
        return (
            <div className="network-info">
                <h4>Content supported by</h4>
                <div className="network-info__supported-content">
                    <a className="network-info__belle" href="http://www.homestolove.com.au/belle/" target="_blank" onClick={this.fireEvent}>
                         <img src="/assets/svgs/belle.svg" alt="Belle"/>
                    </a>
                    <a className="network-info__real-living" href="http://www.homestolove.com.au/real-living/" target="_blank" onClick={this.fireEvent}>
                        <img src="/assets/svgs/realliving.svg" alt="Real Living"/>
                    </a>
                    <div className="network-info__separator" />
                    <a className="network-info__homes" href="http://www.homestolove.com.au/homes-plus/" target="_blank" onClick={this.fireEvent}>
                        <img src="/assets/svgs/homesplus.svg" alt="Homes+"/>
                    </a>
                    <a className="network-info__house-and-garden" href="http://www.homestolove.com.au/house-and-garden/" target="_blank" onClick={this.fireEvent}>
                        <img src="/assets/svgs/housegarden.svg" alt="House & Garden"/>
                    </a>
                </div>
            </div>
        );
    }

}

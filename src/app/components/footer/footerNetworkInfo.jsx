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
                    <span className="network-info__belle">
                         <img src="/assets/svgs/belle.svg" alt="Belle"/>
                    </span>
                    <span className="network-info__real-living">
                        <img src="/assets/svgs/realliving.svg" alt="Real Living"/>
                    </span>
                    <div className="network-info__separator" />
                    <span className="network-info__homes">
                        <img src="/assets/svgs/homesplus.svg" alt="Homes+"/>
                    </span>
                    <span className="network-info__house-and-garden">
                        <img src="/assets/svgs/housegarden.svg" alt="House & Garden"/>
                    </span>
                </div>
            </div>
        );
    }
}

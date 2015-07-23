import platform from '@bxm/ui/lib/common/platform';
import React, {Component, PropTypes} from 'react';

export default class LoadingIcon extends Component {

    constructor(...args) {
        super(...args);
    }

    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const isLoading = this.props.isLoading;
        let icon;

        if (isLoading) {
            if (platform.isIE()) {
                icon = { __html: '<span class="loadicon-icon-ie"><img src="/assets/images/loading_icon/loading-icon-small.gif" /></span>'};
            } else {
                icon = { __html: '<span class="loading-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xml:space="preserve"><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" /></path></svg></span>'};
            }
        } else {
            icon = { __html: '<span class="down-arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="12" height="8" viewBox="0 0 12 8"><path d="M5.773,6.730 C5.773,6.730 -0.001,1.408 -0.001,1.408 C-0.001,1.408 1.258,0.002 1.258,0.002 C1.258,0.002 5.773,4.165 5.773,4.165 C5.773,4.165 10.287,0.002 10.287,0.002 C10.287,0.002 11.546,1.408 11.546,1.408 C11.546,1.408 5.773,6.730 5.773,6.730 Z" id="path-1" class="cls-2" fill-rule="evenodd"/></svg></span> '};
        }
        return <span className="loadicon" dangerouslySetInnerHTML={icon} />;
    }
}

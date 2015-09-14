import React, {Component, PropTypes} from 'react';
import BrandLink from '../brand/link';

export default class Source extends Component {

    static displayName = 'TeaserSource';

    static propTypes = {
        source: PropTypes.string.isRequired
    };

    render() {
        const {source} = this.props;
        if (!source) return null;

        return (
            <div className="teaser__source">
                <BrandLink linkSiteBrand={false} source={source}>
                    <span className="icon-source"
                          dangerouslySetInnerHTML={{__html: `
                        <svg preserveAspectRatio="xMidYMid" width="13" height="13" viewBox="0 0 13 13">
                           <path d="M12.296,11.488 C12.296,11.488 6.929,12.941 6.929,12.941 C6.754,12.988 6.565,12.997 6.437,12.997 C6.251,12.997 6.071,12.977 5.930,12.937 C5.930,12.937 0.701,11.490 0.701,11.490 C0.308,11.382 -0.001,10.993 -0.001,10.586 C-0.001,10.586 -0.001,0.727 -0.001,0.727 C-0.001,0.247 0.451,-0.089 0.918,0.039 C0.918,0.039 6.147,1.487 6.147,1.487 C6.283,1.525 6.580,1.525 6.716,1.489 C6.716,1.489 12.083,0.036 12.083,0.036 C12.548,-0.090 13.000,0.247 13.000,0.727 C13.000,0.727 13.000,10.586 13.000,10.586 C13.000,10.994 12.690,11.382 12.296,11.488 ZM0.811,0.855 C0.811,0.855 0.811,10.586 0.811,10.586 C0.811,10.627 0.866,10.698 0.905,10.708 C0.905,10.708 6.094,12.141 6.094,12.141 C6.094,12.141 6.094,2.287 6.094,2.287 C6.041,2.278 5.976,2.280 5.930,2.267 C5.930,2.267 0.811,0.855 0.811,0.855 ZM12.188,0.850 C12.188,0.850 6.929,2.270 6.929,2.270 C6.921,2.273 6.913,2.273 6.906,2.274 C6.906,2.274 6.906,12.107 6.906,12.107 C6.906,12.107 12.083,10.705 12.083,10.705 C12.122,10.695 12.188,10.627 12.188,10.586 C12.188,10.586 12.188,0.850 12.188,0.850 Z" id="path-1" class="cls-2" fill-rule="evenodd"/>
                        </svg>`}}>
                    </span>
                    {source}
                </BrandLink>
            </div>
        );
    }
}

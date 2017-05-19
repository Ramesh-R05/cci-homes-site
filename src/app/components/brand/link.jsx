import React, { Children, Component, PropTypes } from 'react';

export default class BrandLink extends Component {

    static displayName = 'BrandLink';

    static propTypes = {
        children: PropTypes.any.isRequired,
        linkSiteBrand: PropTypes.bool,
        source: PropTypes.string.isRequired
    };

    static defaultProps = {
        linkSiteBrand: true
    };

    static sources = {
        belle: '/belle',
        'real living': '/real-living',
        'australian house and garden': '/australian-house-and-garden',
        'homes+': '/homes-plus',
        'homes to love': '/'
    };

    static siteBrand = 'homes to love';

    render() {
        const { children, linkSiteBrand, source } = this.props;

        if (!Children.count(children)) return null;

        if (!source || !BrandLink.sources[source.toLowerCase()] || (!linkSiteBrand && source.toLowerCase() === BrandLink.siteBrand)) {
            return <span>{children}</span>;
        }

        const url = BrandLink.sources[source.toLowerCase()];

        return <a href={url}>{children}</a>;
    }
}

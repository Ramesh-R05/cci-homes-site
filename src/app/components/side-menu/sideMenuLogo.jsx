import React, { PropTypes, Component } from 'react';

class SideMenuLogo extends Component {
    static displayName = 'SideMenuLogo';

    static propTypes = {
        logoItem: PropTypes.object.isRequired,
        logoClassName: PropTypes.string.isRequired,
        logoClassNameGTMPrefix: PropTypes.string.isRequired,
        openInNewTab: PropTypes.bool
    };

    static defaultProps = {
        openInNewTab: false
    };

    render() {
        const { logoClassName, logoClassNameGTMPrefix, openInNewTab, logoItem } = this.props;
        const { id, title, url, imageUrl } = logoItem;

        return (
            <li key={url}>
                <a href={url} target={openInNewTab ? '_blank' : '_self'} title={title} className={`${logoClassNameGTMPrefix}${id}`}>
                    <img src={imageUrl} alt={title} className={`${logoClassName}__logo--${id}`} />
                </a>
            </li>
        );
    }
}

export default SideMenuLogo;

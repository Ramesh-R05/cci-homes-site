import React, { PropTypes, Component } from 'react';

class SideMenuLogo extends Component {

    static propTypes = {
        key: PropTypes.array.isRequired,
        logoItem: PropTypes.object.isRequired,
        openInNewTab: PropTypes.bool,
        logoClassName: PropTypes.string,
        logoClassNameGTMPrefix: PropTypes.string
    };

    render() {
        const { key, logoClassName, logoClassNameGTMPrefix } = this.props;
        const { id, title, url, imageUrl } = this.props.logoItem;

        return (
            <li key={key}>
                <a
                  href={url}
                  target={this.props.openInNewTab ? '_blank' : '_self'}
                  title={title}
                  className={`${logoClassNameGTMPrefix}${id}`}
                >
                    <img src={imageUrl} alt={title} className={`${logoClassName}__logo--${id}`} />
                </a>
            </li>
        );
    }
}

export default SideMenuLogo;

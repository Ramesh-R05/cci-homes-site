import React, {PropTypes, Component} from 'react';

class SideMenuLogo extends Component {

    static propTypes = {
        key: PropTypes.array.isRequired,
        logoItem: PropTypes.object.isRequired,
        openInNewTab: PropTypes.bool,
        sideMenuListClassName: PropTypes.string,
        sideMenuListLogosGTMClassNamePrefix: PropTypes.string
    };

    render() {
        let { key, sideMenuListClassName, sideMenuListLogosGTMClassNamePrefix } = this.props;
        let { id, title, url, imageUrl } = this.props.logoItem;

        return (
            <li key={key}>
                <a href={url}
                   target={this.props.openInNewTab ? '_blank' : '_self'}
                   title={title}
                   className={`${sideMenuListLogosGTMClassNamePrefix}${id}`}>
                    <img src={imageUrl} alt={title} className={`${sideMenuListClassName}__logo--${id}`} />
                </a>
            </li>
        );
    }
}

export default SideMenuLogo;

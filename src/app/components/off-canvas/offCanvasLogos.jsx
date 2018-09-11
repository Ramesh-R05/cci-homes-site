import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class offCanvasLogos extends Component {
    static propTypes = {
        logoList: PropTypes.arrayOf(
            PropTypes.shape({
                imageUrl: PropTypes.string,
                url: PropTypes.string,
                title: PropTypes.string,
                id: PropTypes.string
            })
        )
    };

    static defaultProps = {
        logoList: []
    };

    render() {
        const { logoList } = this.props;

        if (!!logoList && !logoList.length) {
            return null;
        }

        const list = logoList.map(({ imageUrl, url, title, id }) => {
            const anchorClassNames = classNames('off-canvas-logos__anchor', `gtm-hamburger-${id}`);
            const imgClassNames = classNames('off-canvas-logos__logo', `off-canvas-logos__logo--${id}`);

            return (
                <li className="off-canvas-logos__logo-wrapper" key={url}>
                    <a href={url} target="_blank" title={title} className={anchorClassNames}>
                        <img src={imageUrl} alt={title} className={imgClassNames} />
                    </a>
                </li>
            );
        });

        return <ul className="off-canvas-logos">{list}</ul>;
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';

export default function BreadCrumbs({ links }) {
    const HomeIcon = () => (
        <SVG src="/assets/icons/house.svg" className="directory-breadcrumbs__icon">
            <img src="/assets/icons/home.svg" alt="Icon house" />
        </SVG>
    );

    const CarratRightIcon = () => (
        <SVG src="/assets/icons/caret-right.svg" className="directory-breadcrumbs__carrot-icon show-for-medium-up">
            <img src="/assets/icons/carrat-right.svg" alt="Icon carrat right" />
        </SVG>
    );

    function createBreadCrumbs(items) {
        return items
            .map((link, index) => {
                if (!index) {
                    return {
                        ...link,
                        title:
                            items.length > 1 ? (
                                <a className="directory-breadcrumbs__link" href={link.url}>
                                    <HomeIcon />
                                </a>
                            ) : (
                                <a className="directory-breadcrumbs__link" href={link.url}>
                                    <HomeIcon />
                                    <div className="directory-breadcrumbs__icon-box">
                                        <span className="directory-breadcrumbs__home_text">DIRECTORY</span>
                                    </div>
                                </a>
                            )
                    };
                }

                return { ...link };
            })
            .reduce((acc, val, index, source) => {
                const newAcc = [...acc];

                const linkClass = classNames('directory-breadcrumbs__link', {
                    'show-for-medium-up': index > 0
                });

                const link = !index ? (
                    val.title
                ) : (
                    <a className={linkClass} href={val.url}>
                        {val.title}
                    </a>
                );

                newAcc.push(link);

                if (source.length > 1 && index !== source.length - 1) {
                    newAcc.push(<CarratRightIcon />);
                }

                return newAcc;
            }, []);
    }

    return <nav className="directory-breadcrumbs">{createBreadCrumbs(links)}</nav>;
}

BreadCrumbs.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
};

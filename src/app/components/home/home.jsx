import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import SectionFeatured from './sectionFeatured';
import cx from 'classnames';

class Home extends Component {
    static propTypes = {
        content: PropTypes.object,
        articles: PropTypes.array,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const menuSliderClassName = cx('homepage side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        const {content, articles} = this.props;

        return (
            <div className={menuSliderClassName}>
                <SectionFeatured articles={articles} className="home__body" />
            </div>
        );
    }
}

export default connectToStores(Home, ['PageStore'], (context) => {
    const pageStore = context.getStore('PageStore');

    return {
        content: pageStore.getContent(),
        articles: pageStore.getItems()
    };
});

import React, {Component, PropTypes} from 'react';
import Hero from './hero';
import Summary from '@bxm/article/lib/components/header/summary';
import Title from '@bxm/article/lib/components/header/title';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {title, summary, heroItem} = this.props;

        return (
            <header className="article__header">
                <div className="article__header-tile-and-hero">
                    <div className="article__title-container">
                        <Title title={title}/>
                    </div>
                    <div className="article__hero-container">
                        <Hero item={heroItem}/>
                    </div>
                </div>
                <Summary summary={summary}/>
            </header>
        );
    }

}

Header.propTypes = {
    heroItem: PropTypes.object.isRequired,
    summary: PropTypes.string,
    title: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired
};

Header.defaultProps = {
    heroItem: {
        imageUrl: '',
        imageAltText: '',
        imageCaption: ''
    }
};

export default Header;

import React, {Component, PropTypes} from 'react';
import Hero from './hero';
import Summary from '@bxm/article/lib/components/header/summary';
import Title from '@bxm/article/lib/components/header/title';
import Ad from '@bxm/ad/src/google/components/ad';
import SocialShareBlock from '@bxm/ui/lib/social/components/SocialShareBlock';
import StaticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {pageId, url, title, summary, heroItem} = this.props;

        let getSocial;
        if (StaticConfigurationStore.isFeatureEnabled('socialShareBlock') === true) {
            getSocial = (<SocialShareBlock
                parentBlock={this.props}
                url={url}
                title={title}
                tweetBody={title + ' | HOMES TO LOVE {shortURL} #homestoloveau '}
                description={summary}
                imageUrl={heroItem.imageUrl}
                className={"social-share-block hide-for-print"}
                heading="Share"
                countText={false}
                nodeId={pageId}
                />);
        }

        return (
            <header className="article__header">
                <div className="article__header-tile-and-hero">
                    <div className="article__title-container">
                        <Title title={title}/>
                        {getSocial}
                    </div>
                    <div className="article__hero-container">
                        <Hero item={heroItem}/>
                    </div>
                </div>
                <Ad className="ad--beneath-short-teaser" displayFor="small" sizes="banner"/>
                <Summary summary={summary}/>
            </header>
        );
    }
}

Header.propTypes = {
    pageId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    heroItem: PropTypes.object.isRequired,
    summary: PropTypes.string,
    title: PropTypes.string.isRequired
};

Header.defaultProps = {
    heroItem: {
        imageUrl: '',
        imageAltText: '',
        imageCaption: ''
    }
};

export default Header;

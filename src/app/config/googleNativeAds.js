export default {
    targets: { env: 'test' },
    adSize: 'fluid',
    server: 'dfp',
    details: {
        homeMustRead: [
            {
                index: 1,
                label: 'home_mustread_1',
                targets: { kw: 'home_mustread_1' },
                adUnitPath: 'sponsored/HomeMustReadModule1',
                adPositionClassName: 'google-native-ad-home-must-read-module-1'
            },
            {
                index: 4,
                label: 'home_mustread_2',
                targets: { kw: 'home_mustread_2' },
                adUnitPath: 'sponsored/HomeMustReadModule2',
                adPositionClassName: 'google-native-ad-home-must-read-module-2'
            }
        ],
        homeTopFeed: [
            {
                index: 0,
                label: 'home_top_feed_1',
                targets: { kw: 'home_top_feed_1' },
                adUnitPath: 'sponsored/HomeTopNewsFeed1',
                adPositionClassName: 'google-native-ad-home-top-news-feed-1'
            },
            {
                index: 5,
                label: 'home_top_feed_2',
                targets: { kw: 'home_top_feed_2' },
                adUnitPath: 'sponsored/HomeTopNewsFeed2',
                adPositionClassName: 'google-native-ad-home-top-news-feed-2'
            }
        ],
        homeBottomFeed: [
            {
                index: 1,
                label: 'home_bottom_feed_1',
                targets: { kw: 'home_bottom_feed_1' },
                adUnitPath: 'sponsored/HomeBottomNewsFeed1',
                adPositionClassName: 'google-native-ad-home-bottom-news-feed-1'
            },
            {
                index: 5,
                label: 'home_bottom_feed_2',
                targets: { kw: 'home_bottom_feed_2' },
                adUnitPath: 'sponsored/HomeBottomNewsFeed2',
                adPositionClassName: 'google-native-ad-home-bottom-news-feed-2'
            }
        ],
        sectionTopFeed: [
            {
                index: 0,
                label: 'section_top_feed_1',
                targets: { kw: 'section_top_feed_1' },
                adUnitPath: 'sponsored/SectionTopFeed1',
                adPositionClassName: 'google-native-ad-section-top-news-feed-1'
            },
            {
                index: 5,
                label: 'section_top_feed_2',
                targets: { kw: 'section_top_feed_2' },
                adUnitPath: 'sponsored/SectionTopFeed2',
                adPositionClassName: 'google-native-ad-section-top-news-feed-2'
            }
        ],
        sectionBottomFeed: [
            {
                index: 1,
                label: 'section_bottom_feed_1',
                targets: { kw: 'section_bottom_feed_1' },
                adUnitPath: 'sponsored/SectionBottomFeed1',
                adPositionClassName: 'google-native-ad-section-bottom-news-feed-1'
            },
            {
                index: 5,
                label: 'section_bottom_feed_2',
                targets: { kw: 'section_bottom_feed_2' },
                adUnitPath: 'sponsored/SectionBottomFeed2',
                adPositionClassName: 'google-native-ad-section-bottom-news-feed-2'
            }
        ],
        articleRightFeed: [
            {
                index: 1,
                label: 'article_right_feed_1',
                targets: {
                    kw: 'article_right_feed_1'
                },
                adUnitPath: 'sponsored/ArticleRightFeed1',
                adPositionClassName: 'google-native-ad-article-news-feed-1'
            },
            {
                index: 4,
                label: 'article_right_feed_2',
                targets: {
                    kw: 'article_right_feed_2'
                },
                adUnitPath: 'sponsored/ArticleRightFeed2',
                adPositionClassName: 'google-native-ad-article-news-feed-2'
            },
            {
                index: 8,
                label: 'article_right_feed_3',
                targets: {
                    kw: 'article_right_feed_3'
                },
                adUnitPath: 'sponsored/ArticleRightFeed3',
                adPositionClassName: 'google-native-ad-article-news-feed-3'
            },
            {
                index: 13,
                label: 'article_right_feed_4',
                targets: {
                    kw: 'article_right_feed_4'
                },
                adUnitPath: 'sponsored/ArticleRightFeed4',
                adPositionClassName: 'google-native-ad-article-news-feed-4'
            }
        ],
        articleRelatedFeed: {
            index: 0,
            label: 'article_related',
            targets: {
                kw: 'article_related'
            },
            adUnitPath: 'sponsored/ArticleRelatedFeed',
            adPositionClassName: 'google-native-ad-article-related-feed',
            pos: 'body' // most native ad positions are hard coded, to define it in config you must extend the functionality of the component that uses it
            // example @ https://github.com/bauerxcelmedia/wn-article/blob/master/src/components/feed/feedItem.jsx
        },
        articleCarousel: {
            index: 0,
            label: 'article_mobilecarousel_1',
            targets: {
                kw: 'article_mobilecarousel_1'
            },
            adUnitPath: 'sponsored/ArticleCarousel1',
            adPositionClassName: 'google-native-ad-article-carousel-1',
            pos: 'body'
        }
    }
};

import React, {Component} from 'react';

// Patternlab components
import Code from './core/code';
import Notes from './core/notes';

// Site components/utils
import Feed from '@bxm/article/lib/components/feed/feed';
import FeedItem from '@bxm/article/lib/components/feed/feedItem';

// Test data
import mockFeedItems from '../../../tests/mock/feed'

export default class FeedExample extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Feed components</h1>

                {/* FeedItem */}
                <h2 id="feedItem" className="heading2">
                    FeedItem<br/>
                    <small className="file-path">components/feed/feedItem</small>
                </h2>

                <ul style={{padding: 0}}>
                    <FeedItem
                        gtmClass="feed-item-0"
                        item={{
                            url: '/royals/british-royal-family/cms-testing-20094',
                            imageUrl: 'http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/aww/2015/05/18/20094/3df5cb97afa068e3629934b3777d235b.jpg',
                            title: 'I love autumn',
                            topic: 'real-living',
                            nodeType: 'Gallery'
                        }}/>
                </ul>

                <Code>
                    {`<FeedItem \n gtmClass="feed-item-0" \n item={{...}} \n />`}
                </Code>
                <Notes>
                    <p>You must provide:<br/>
                        <code>gtmClass (string)</code><br/>
                        <code>item (object)</code>
                    </p>
                </Notes>
            </div>
        );
    }
}

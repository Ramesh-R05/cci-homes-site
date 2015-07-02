import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components/utils
import SocialShareBlock from '@bxm/ui/lib/social/components/SocialShareBlock';
import breakpoints from '../../../app/breakpoints';
import articleMock from '../../../tests/mock/article';
// Test data
const {id, siteUrl, url, title, summary, imageUrl} = articleMock;


export default class Article extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Social Block Component</h1>

                {/* HeroImage */}
                <h2 id="heroImage" className="heading2">SocialShareBlock<br />
                    <small className="file-path">@bxm/ui/lib/social/components/SocialShareBlock</small>
                </h2>

                <div style={{"max-width": "1140px", "background-color": '#fff'}}>
                    <SocialShareBlock
                        parentBlock={articleMock}
                        url={siteUrl + url}
                        title={title}
                        tweetBody={title + ' | HOMES TO LOVE {shortURL} #homestoloveau '}
                        description={summary}
                        imageUrl={imageUrl}
                        className={"article__social_share hide-for-print"}
                        heading="Share"
                        countText={false}
                        nodeId={id}
                    />
                </div>
                <Code>
                    {`<SocialShareBlock parentBlock={this.props} url={siteUrl} title={title} tweetBody={tweetBody} description={summary} imageUrl={imageUrl} className={"article__social_share hide-for-print"} heading="Share" countText={false} nodeId={pageId} />`}
                </Code>
                <Notes>
                    <p>You must provide a <code>url</code>,  <code>title</code>, <code>summary</code>, <code>imageUrl</code>, <code>pageId</code> and <code>parentBlack</code>.</p>
                    <p><code>tweetBody</code> should has the form <code dangerouslySetInnerHTML={{__html: " title + ' | HOMES TO LOVE {shortURL} #homestoloveau '"}}></code></p>
                </Notes>
                <Notes>
                    <p>For facebook usage, it is mandatory to define a <code>CNAME</code> url that points to <code>socialize.gigya.com</code>. For development, we don;t have such a URL. I reckon that the facebook social share can be tested and implemented when we go in production.</p>
                </Notes>
            </div>
        );
    }
}

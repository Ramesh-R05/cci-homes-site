import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components/utils
import HeroImage from '@bxm/article/lib/components/hero/image';
import Summary from '@bxm/article/lib/components/header/summary';
import Footer from '../../../app/components/article/footer';
import breakpoints from '../../../app/breakpoints';
// Test data
import articleData, {summary, source, articleTags as tags} from '../../../tests/mock/article';
const heroItem = {
    imageUrl: articleData.imageUrl,
    imageAltText: articleData.imageAltText,
    imageCaption: articleData.imageCaption
};
const credits = {
    writer: articleData.writer,
    photographer: articleData.photographer,
    stylist: articleData.stylist,
    experter: articleData.experter
};

export default class Article extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Article components</h1>

                {/* HeroImage */}
                <h2 id="heroImage" className="heading2">HeroImage<br />
                    <small className="file-path">@bxm/article/lib/components/hero/image</small></h2>

                <div style={{"max-width": "1140px"}}>
                    <HeroImage
                    url={heroItem.imageUrl}
                    alt={heroItem.imageAltText}
                    caption={heroItem.imageCaption}
                    breakpoints={breakpoints}/>
                </div>
                <Code>
                    {`<HeroImage \n url={heroItem.imageUrl} \n alt={heroItem.imageAltText} \n caption={heroItem.imageCaption} \n breakpoints={breakpoints}/>`}
                </Code>
                <Notes>
                    <p>You must provide a <code>url</code> and <code>breakpoints</code>.</p>
                </Notes>

                {/* Summary */}
                <h2 id="summary" className="heading2">Summary<br />
                    <small className="file-path">@bxm/article/lib/components/header/summary</small></h2>

                <Summary summary={summary}/>
                <Code>
                    {`<Summary summary={summary}/>`}
                </Code>
                <Notes>
                    <p>You must provide a <code>summary</code>.</p>
                </Notes>

                {/* Tags */}
                <h2 id="footer" className="heading2">Footer<br />
                    <small className="file-path">components/article/footer</small></h2>

                <Footer
                    credits={credits}
                    source={source}
                    tags={tags}/>
                <Code>
                    {`<Footer \n credits={credits} \n source={source} \n tags={tags}/>`}
                </Code>
                <Notes>
                    <p>You must provide an array of <code>tags</code>, object of <code>credits</code> and a <code>souce</code>.</p>
                </Notes>

            </div>
        );
    }
}

import React, {Component} from 'react';
// Patternlab components
import Code from './core/code';
import Notes from './core/notes';
// Site components
import Teaser from '../../../app/components/teaser/teaser';
// Test data
import {articles as mockArticles} from '../../../tests/mock/articles';

export default class Teasers extends Component {
    render() {
        return (
            <div>
                <h1 className='heading1'>Teasers</h1>

                {/* Base */}
                <h2 id="base" className="heading2">Base<br />
                    <small className="file-path">components/teaser</small></h2>
                <div className="small-12 medium-7 large-5 xlarge-3">
                    <Teaser {...mockArticles[1]} />
                </div>
                <Code>
                    {`<Teaser {...item} />`}
                </Code>
                <Notes>
                    <p>All the prperties match the article property name we get from the API.</p>
                    <ul>
                        <li><code>imageUrl</code> and <code>url</code> are required.</li>
                        <li><code>tags</code> must be an array.</li>
                        <li><code>id</code> is the article id</li>
                        <li><code>imageAltText</code> string</li>
                        <li><code>modifier</code> is a class modifier e.g. 'narrow' will set the 'teaser--narrow' class. It will also pick the correct image sizes. Defaults to 'img-left'.</li>
                        <li><code>sizes</code> is the responsive images size. If not provided it will try to pick it from the modifier. Possible values are 'base', 'hero', 'narrow' and 'small-hero'. Defaults to 'base'.</li>
                        <li><code>source</code> is the article source and helps dictate the colors of the teaser.</li>
                        <li><code>summary</code> string</li>
                        <li><code>title</code> string</li>
                    </ul>
                </Notes>

                {/* Narrow */}
                <h2 id="narrow" className="heading2">Narrow<br />
                    <small className="file-path">components/teaser</small></h2>
                <div className="small-12 medium-7 large-5 xlarge-3">
                    <Teaser modifier="narrow" {...mockArticles[10]} />
                </div>
                <Code>
                    {`<Teaser modifier="narrow" {...item} />`}
                </Code>

                {/* Hero */}
                <h2 id="hero" className="heading2">Hero<br />
                    <small className="file-path">components/teaser</small></h2>
                <div className="small-12 medium-10 xlarge-7">
                    <Teaser modifier="hero" {...mockArticles[1]} />
                </div>
                <Code>
                    {`<Teaser modifier="hero" {...item} />`}
                </Code>

            </div>
        );
    }
}

import React, {Component, PropTypes} from 'react';
import * as TagUtils from '@bxm/tags/lib/utils';
import isUndefined from 'lodash/lang/isUndefined';
import SponsorHeader from '@bxm/ad/lib/polar/components/sponsor/header';

export default class Header extends Component {

    static displayName = 'SectionHeader';

    static propTypes = {
        children: PropTypes.any,
        tags: PropTypes.array.isRequired
    };

    static defaultProps = {
        tags: []
    };

    render() {
        let tags = this.props.tags;
        if (isUndefined(tags) || !Array.isArray(tags) || tags.length === 0) {
            return null;
        }

        let htmlHeading;
        const heading = TagUtils.getTagName(tags[0]);
        const words = heading.match(/\S+/g);

        if (words.length === 1) {
            htmlHeading = <h1><b>{heading}</b></h1>;
        } else {
            htmlHeading = (
                <h1>
                    {words.map((word, i) => {
                        const key = `heading-word-${i}`;
                        if (i % 2 === 0) {
                            return <span key={key}>{word}</span>;
                        }
                        return <b key={key}> {word} </b>;
                    })}
                </h1>
            );
        }

        return (
            <div className="section-heading">
                {this.props.children}
                <SponsorHeader
                    id={this.props.sponsorName}
                    title={<b>{heading}</b>}>
                        {htmlHeading}
                </SponsorHeader>
            </div>
        );
    }
}

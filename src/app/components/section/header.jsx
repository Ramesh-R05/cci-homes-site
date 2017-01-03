import React, {Component, PropTypes} from 'react';
import SponsorHeader from '@bxm/ad/lib/polar/components/sponsor/header';

export default class Header extends Component {

    static displayName = 'SectionHeader';

    static propTypes = {
        children: PropTypes.any,
        title: PropTypes.string.isRequired
    };

    render() {
        const {title} = this.props;
        if (!title) {
            return null;
        }

        let htmlHeading;
        const words = title.match(/\S+/g);

        if (words.length === 1) {
            htmlHeading = <h1><b>{title}</b></h1>;
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
                    title={<b>{title}</b>}>
                        {htmlHeading}
                </SponsorHeader>
            </div>
        );
    }
}

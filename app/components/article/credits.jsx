import React, {Component, PropTypes} from 'react';
import groupBy from 'lodash/collection/groupBy';
import map from 'lodash/collection/map';
import pluck from 'lodash/collection/pluck';
import sortBy from 'lodash/collection/sortBy';
import get from 'lodash/object/get';
import * as sourceUtils from '../../utils/sourceUtils';
const isArray = Array.isArray;

export default class Credits extends Component {

    static propTypes = {
        authorProfiles: PropTypes.array
    };

    static TITLE_ORDER = [
        'writer',
        'photographer',
        'stylist',
        'renovation_expert'
    ];

    static TITLE_TRANSLATION_MAP = {
        'writer': { s: 'Writer', p: 'Writers' },
        'photographer': { s: 'Photographer', p: 'Photographers' },
        'stylist': { s: 'Stylist', p: 'Stylists' },
        'renovation_expert': { s: 'Renovation expert', p: 'Renovation experts' }
    };

    static creditSorter(credit) {
        const index = Credits.TITLE_ORDER.indexOf(credit.title);
        return index >= 0 ? index : Number.MAX_VALUE;
    }

    static renderCredit(credit) {
        const authors = credit.names;
        const label = get(
            Credits.TITLE_TRANSLATION_MAP,
            [credit.title, authors.length === 1 ? 's' : 'p'],
            credit.title
        );
        const cleanLabel = sourceUtils.normalise(credit.title);
        const className = `article-credit article-credit--${cleanLabel}`;

        return (
            <li className={className}>
                {label}: {authors.map((author, i) => [
                    (i !== 0 ? ', ' : null),
                    <span className="article-credit__value">{author}</span>
                ])}
            </li>
        );
    };

    constructor(...args) {
        super(...args);
    }

    getCredits() {
        const authorProfiles = this.props.authorProfiles;
        const groups = groupBy(authorProfiles, p => p.profileType);
        const credits = map(groups, (group, title) => ({ title, names: pluck(group, 'name') }));
        return sortBy(credits, Credits.creditSorter);
    }

    render() {
        const profiles = this.props.authorProfiles;
        if (!isArray(profiles) || profiles.length === 0) return null;

        return (
            <ul className="article__credits">
                {this.getCredits().map(Credits.renderCredit)}
            </ul>
        );
    }
}

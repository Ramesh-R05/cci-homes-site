import React, {Component, PropTypes} from 'react';
import {unescape} from 'lodash/string';
import classNames from 'classnames';

export default class Credits extends Component {

    static propTypes = {
        writer: PropTypes.string,
        photographer: PropTypes.string,
        stylist: PropTypes.string,
        experter: PropTypes.string
    }

    constructor(props, context) {
        super(props, context);
    }

    generateCredit(label, value, isFirst) {
        if (!value || !label) return null;

        const labelClass = unescape(label).replace(/[^\w\n\r\s]/g, '').replace(/\s+/g, '-').toLocaleLowerCase();
        const cssCLasses = classNames(`article-credit`, `article-credit__${labelClass}`, {
            'article-credit--first': isFirst
        });

        return (<li className={cssCLasses}>{label}: <span className="article-credit__value">{value}</span></li>);
    };


    render() {
        const {writer, photographer, stylist, experter} = this.props;
        let isFirst = true;
        let creditList = [];

        if (writer) {
            creditList.push(this.generateCredit('Writer', writer, isFirst));
            isFirst = false;
        }

        if (photographer) {
            creditList.push(this.generateCredit('Photographer', photographer, isFirst));
            isFirst = false;
        }

        if (stylist) {
            creditList.push(this.generateCredit('Stylist', stylist, isFirst));
            isFirst = false;
        }

        return (
            <ul className="article__credits">
                {creditList}
                {this.generateCredit('Renovation experter', experter)}
            </ul>
        );
    }
}

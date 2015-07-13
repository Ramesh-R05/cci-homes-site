import React, {Component, PropTypes} from 'react';
import {unescape} from 'lodash/string';

const IMG_PATH = '/assets/images/source/';

export default class Credits extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {source} = this.props;

        if (!source) return null;

        const filename = unescape(source).replace(/[^\w\n\r\s]/g, '').replace(/\s+/g, '-').toLocaleLowerCase();
        const imageUrl = `${IMG_PATH + filename}.svg`;

        return (
            <div className="article__source">
                <span>Article By</span>
                <img src={imageUrl} alt={source} />
            </div>
        );
    }

}

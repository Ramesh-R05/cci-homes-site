import React, {Component, PropTypes} from 'react';
import {unescape} from 'lodash/string';

const IMG_PATH = '/assets/images/source/';

class Credits extends Component {

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

Credits.propTypes = {
    source: PropTypes.string.isRequired
};

export default Credits;

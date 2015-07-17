import React, {Component, PropTypes} from 'react';
import Credits from './credits';
import Source from './source';
import Tags from './tags';

export default class Footer extends Component {

    static propTypes = {
        tags: PropTypes.array.isRequired,
        source: PropTypes.string,
        credits: PropTypes.object
    };

    static defaultProps = {
        credits: {
            writer: '',
            photographer: '',
            stylist: '',
            experter: ''
        }
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {source, tags, credits} = this.props;
        const {writer, photographer, stylist, experter} = credits;

        return (
            <footer className="article__footer">
                <Tags tags={tags} />
                <Credits
                    writer={writer}
                    photographer={photographer}
                    stylist={stylist}
                    experter={experter}/>
                <Source source={source} />
            </footer>
        );
    }

}

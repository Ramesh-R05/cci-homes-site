import React, {Component, PropTypes} from 'react';
import Credits from './credits';
import Source from './source';
import Tags from './tags';

export default class Footer extends Component {

    static propTypes = {
        tags: PropTypes.array.isRequired,
        source: PropTypes.string,
        authorProfiles: PropTypes.array
    };

    static defaultProps = {
        authorProfiles: []
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {source, tags, authorProfiles} = this.props;
        return (
            <footer className="article__footer">
                <Tags tags={tags}/>
                <Credits authorProfiles={authorProfiles}/>
                <Source source={source}/>
            </footer>
        );
    }

}

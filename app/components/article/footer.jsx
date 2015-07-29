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
        return (
            <footer className="article__footer">
                <Tags tags={this.props.tags}/>
                <Credits authorProfiles={this.props.authorProfiles}/>
                <Source source={this.props.source}/>
            </footer>
        );
    }

}

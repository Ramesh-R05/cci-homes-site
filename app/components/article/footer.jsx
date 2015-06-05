import React, {Component, PropTypes} from 'react';
import Credits from './credits';
import Source from './source';
import Tags from '@bxm/article/lib/components/tags';

class Footer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {source, tags} = this.props;
        const {writer, photographer, stylist, experter} = this.props.credits;

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

Footer.propTypes = {
    tags: PropTypes.array.isRequired,
    source: PropTypes.string,
    credits: PropTypes.object
};

Footer.defaultProps = {
    credits: {
        writer: '',
        photographer: '',
        stylist: '',
        experter: ''
    }
};

export default Footer;
import React, {Component, PropTypes} from 'react';
import PageStore from '../../stores/page';

class HtmlComponent extends Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(PageStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width" />
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Libre+Baskerville:400,700,400italic" />
                <script src="//use.typekit.net/mmp8xzm.js"></script>
                <script dangerouslySetInnerHTML={{__html: 'try{Typekit.load()}catch(e){}'}}></script>
                <link rel="stylesheet" href="/dist/styles/main.css" />
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/dist/scripts/main.js" defer></script>
            </html>
        );
    }
}

HtmlComponent.propTypes = {
    context: PropTypes.object,
    markup: PropTypes.string,
    state: PropTypes.string
};

export default HtmlComponent;

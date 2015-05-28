'use strict';

import React, {Component} from 'react';


class HtmlComponent extends Component {
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Components Styleguide - Homes</title>
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Libre+Baskerville:400,700,400italic" />
                    <script src="//use.typekit.net/mmp8xzm.js"></script>
                    <script dangerouslySetInnerHTML={{__html: 'try{Typekit.load()}catch(e){}'}}></script>
                    <link rel="stylesheet" href="/dist/styles/patternlab.css" />
                    <link rel="stylesheet" href="/dist/styles/main.css" />
                </head>
                <body className="body">
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                </body>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/dist/scripts/patternlab.js" defer></script>
            </html>
        )
    }
}

export default HtmlComponent;

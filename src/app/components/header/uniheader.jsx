import React, {Component, PropTypes} from 'react';

export default class Uniheader extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        return (
            <header className="uniheader show-for-medium-up">
                <nav className="uniheader__nav container">
                    {
                        this.context.config.brands.map((item, i) => {
                            return (
                                <li>
                                    <a key={i} href={item.url} title={item.title} className={`gtm-uniheader-${item.gtmClass}`}>
                                        <img
                                            src={item.imageUrl} alt={item.title}
                                            className={`uniheader__logo--${item.title.replace(/ /g, '-').toLowerCase()}`}
                                        />
                                    </a>
                                </li>
                            );
                        })
                    }
                </nav>
            </header>
       )
    }
}

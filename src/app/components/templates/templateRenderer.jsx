import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';

export class TemplateRenderer extends Component {
    static propTypes = {
        toggleSideMenu: PropTypes.func.isRequired,
        menuClasses: PropTypes.string.isRequired,
        Template: PropTypes.func.isRequired,
        templateProps: PropTypes.object.isRequired
    };

    toggleMenu = () => {
        const { toggleSideMenu } = this.props;

        toggleSideMenu('left');
    };

    render() {
        const { Template, templateProps, menuClasses } = this.props;

        if (!Template || typeof Template !== 'function') {
            return null;
        }

        return <Template menuClasses={menuClasses} toggleMenu={this.toggleMenu} {...templateProps} />;
    }
}

export default hamburgerWrapper(TemplateRenderer);

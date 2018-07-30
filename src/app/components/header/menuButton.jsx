import React, { Component, PropTypes } from 'react';
import activateSideMenu from '../../actions/menuActions';

export default class MenuButton extends Component {
    static displayName = 'MenuButton';

    static contextTypes = {
        executeAction: PropTypes.func
    };

    activateSideMenu = () => {
        const { executeAction } = this.context;
        executeAction(activateSideMenu);
    };

    render() {
        /* eslint-disable react/no-danger, max-len */
        return (
            <div className="header-menu">
                <button
                  className="header-menu__button-menu"
                  onClickCapture={this.activateSideMenu}
                  dangerouslySetInnerHTML={{
 __html: `
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="20" height="17" viewBox="0 0 20 17">
                            <path d="M-0.006,16.994 C-0.006,16.994 -0.006,13.996 -0.006,13.996 C-0.006,13.996 20.006,13.996 20.006,13.996 C20.006,13.996 20.006,16.994 20.006,16.994 C20.006,16.994 -0.006,16.994 -0.006,16.994 ZM-0.006,6.995 C-0.006,6.995 20.006,6.995 20.006,6.995 C20.006,6.995 20.006,9.995 20.006,9.995 C20.006,9.995 -0.006,9.995 -0.006,9.995 C-0.006,9.995 -0.006,6.995 -0.006,6.995 ZM-0.006,-0.005 C-0.006,-0.005 20.006,-0.005 20.006,-0.005 C20.006,-0.005 20.006,2.995 20.006,2.995 C20.006,2.995 -0.006,2.995 -0.006,2.995 C-0.006,2.995 -0.006,-0.005 -0.006,-0.005 Z" id="path-1" class="cls-2" fill-rule="evenodd"/>
                        </svg>
                    `
}}
                />
            </div>
        );
    }
}

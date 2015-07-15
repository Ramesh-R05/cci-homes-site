import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {provideContext} from '@bxm/flux';
import {handleHistory} from 'fluxible-router';
import config from '../config/config';
import platform from '@bxm/ui/lib/common/platform';
import StaticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.object
    };

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    constructor(props, context) {
        super(props, context);

        if (canUseDOM) {
            platform.set(navigator.userAgent);
        }
    }

    componentWillMount() {
        StaticConfigurationStore.setConfiguration(config);
    }

    componentDidUpdate(prevProps) {
        let newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }

    render() {
        const Handler = this.props.currentRoute.get('handler');
        return <Handler/>;
    }
}

export default provideContext(handleHistory(Application));

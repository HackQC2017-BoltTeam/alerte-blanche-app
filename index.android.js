import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import RouterView from './components/router';

export default class MobileApp extends Component {
    render() {
        return (
            <RouterView />
        );
    }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);

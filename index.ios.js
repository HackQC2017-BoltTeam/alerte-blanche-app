import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import MenuNavigator from './components/controls/navigator';

export default class MobileApp extends Component {
    render() {
        return (
            <MenuNavigator />
        );
    }
}

AppRegistry.registerComponent('MobileApp', () => MobileApp);

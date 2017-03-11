import React, { Component } from 'react';
import { Navigator } from 'react-native';

import CameraView from '../views/camera';
import WelcomeView from '../views/welcome';
import SubscriptionView from '../views/subscription';
import LoginView from '../views/login';
import MapView from '../views/map';


class MenuNavigator extends Component {
    constructor(props) {
        super(props);
    }
    renderScene(route, nav) {
        switch (route.id) {
            case 'welcome':
                return <WelcomeView navigator={nav} />;
            case 'camera':
                return <CameraView navigator={nav} />;
            case 'subscription':
                return <SubscriptionView navigator={nav} />;
            case 'login':
                return <LoginView navigator={nav} />;
            case 'map':
                return <MapView navigator={nav} />;
            default:
                return <WelcomeView navigator={nav} />;
        }
    }
    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'welcome'}}
                renderScene={this.renderScene}
                configureScene={this.configureScene} />
        );
    }
}

module.exports = MenuNavigator;

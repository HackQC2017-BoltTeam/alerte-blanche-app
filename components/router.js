'use strict';

import React, { Component } from 'react';
import { Navigator, View, Text, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import SideMenu from 'react-native-side-menu';
import LeftMenu from './common/left_menu';

// Services
import UserService from './services/user_service';

// Views
import WelcomeView from './views/welcome';
import CameraView from './views/camera';
import LoginView from './views/login';
import LogoutView from './views/logout';
import SubscriptionView from './views/subscription';
import MapView from './views/map';
import ProfileView from './views/profile';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
        UserService.isLogged() ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class Router extends Component {
    render() {
        var menu = <LeftMenu />
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <SideMenu menu={menu}>
                        <Route exact path="/" component={WelcomeView} />
                        <Route path="/login" component={LoginView} />
                        <Route path="/logout" component={LogoutView} />
                        <Route path="/subscription" component={SubscriptionView} />

                        <PrivateRoute path="/camera" component={CameraView} />
                        <PrivateRoute path="/map" component={MapView} />
                        <PrivateRoute path="/profile" component={ProfileView} />
                    </SideMenu>
                </View>
            </NativeRouter>
        );
    }
}

module.exports = Router;

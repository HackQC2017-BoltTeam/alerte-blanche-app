'use strict';

import React, { Component } from 'react';
import { Navigator, View, Text, StyleSheet } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navbar';

// App imports
import LeftMenu from './common/left_menu';

// Services
import UserService from './services/user_service';

// Views
import WelcomeView from './views/welcome';
import CameraView from './views/camera';
import LoginView from './views/login';
import LogoutView from './views/logout';
import SubscriptionView from './views/subscription';
import ParkingListView from './views/parking_list';
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
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            titleNavbar: 'Bienvenue'
        };
    }
    onChangeMenuState(isOpen) {
        this.setState({isMenuOpen: isOpen});
    }
    toggleMenuState() {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    }
    goTo(page) {
        // Toggle menu
        this.toggleMenuState();
        // Set title
        var title = '';
        switch(page) {
            case 'welcome': title = 'Bienvenue'; break;
            case 'camera': title = 'Signaler'; break;
            case 'parking': title = 'Parking'; break;
            case 'profile': title = 'Profile'; break;
            case 'login': title = 'Connection'; break;
            case 'logout': title = 'Connection'; break;
            default: title = 'Bienvenue';
        }
        this.setState({titleNavbar: title});
    }
    render() {
        // Menu
        var menu = <LeftMenu toggleMenuState={this.toggleMenuState} goTo={this.goTo.bind(this)} />;
        // Navigation Bar
        const title = { title: this.state.titleNavbar };
        const leftButtonNavbar = {
            title: 'Menu',
            handler: (() => { this.toggleMenuState(); })
        };
        // Render
        return (
            <NativeRouter onUpdate={this.onEnter}>
                <View style={styles.container}>
                    <SideMenu menu={menu} isOpen={this.state.isMenuOpen} onChange={this.onChangeMenuState.bind(this)}>
                        <NavigationBar title={title} leftButton={leftButtonNavbar} />

                        <Route exact path="/" onEnter={this.onEnter} component={WelcomeView} />

                        <Route path="/login" component={LoginView} />
                        <Route path="/logout" component={LogoutView} />
                        <Route path="/subscription" component={SubscriptionView} />

                        <PrivateRoute path="/camera" component={CameraView} />
                        <PrivateRoute path="/parking"  component={ParkingListView} />
                        <PrivateRoute path="/profile" component={ProfileView} />
                    </SideMenu>
                </View>
            </NativeRouter>
        );
    }
}

module.exports = Router;

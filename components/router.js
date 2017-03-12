global.___DEV___ = false

'use strict';

// Lib imports
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NativeRouter, Route, Redirect } from 'react-router-native'
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navbar';
import store from 'react-native-simple-store';
import EventEmitter from 'EventEmitter';
import Subscribable from 'Subscribable';

// App imports
import LeftMenu from './common/left_menu';
import NavBarIconLeft from './common/icon_navbar';

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

// Android specific
if (Platform.OS === 'android') {
    var PushService = require('./services/push_service').PushNotification;
    var setEmitter = require('./services/push_service').setEmitter;
}

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
            titleNavbar: 'Bienvenue',
            titleLeftMenu: 'Menu',
            handlerLeftMenu: this.toggleMenuState.bind(this),
            displayParking: false
        };
        // FIXME: Trick Android for notification
        if (Platform.OS === 'android') {
            this.eventEmitter = new EventEmitter();
            setEmitter(this.eventEmitter);
        }
    }
    componentDidMount() {
        // FIXME: Trick Android for notification
        if (Platform.OS === 'android') {
            this.addListenerOn(this.eventEmitter, 'pushNewView', (result) => {
                this.setState({displayParking: true, payload: result});
            });
        }
        // Get user from local storage
        store.get('user').then((user) => {
            if (user) { UserService.setUser(user); }
        })
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
            case 'parking': title = 'Stationnement'; break;
            case 'profile': title = 'Profile'; break;
            case 'login': title = 'Connexion'; break;
            case 'logout': title = 'Connexion'; break;
            case 'subscription': title = 'Enregistrement'; break;
            default: title = 'Bienvenue';
        }
        this.setState({titleNavbar: title});
    }


    render() {
        // Menu
        var menu = <LeftMenu toggleMenuState={this.toggleMenuState} goTo={this.goTo.bind(this)} />;
        // Navigation Bar
        const leftButtonNavbar = {
            title: 'Menu',
            handler: this.state.handlerLeftMenu.bind(this)
        };
        // FIXME: Trick Android for notification
        if (this.state.displayParking) {
            return (
                <NativeRouter onUpdate={this.onEnter}>
                    <View style={styles.container}>
                        <SideMenu menu={menu} isOpen={this.state.isMenuOpen} onChange={this.onChangeMenuState.bind(this)}>
                            <NavigationBar
                                title={{title: 'Stationnement'}}
                                leftButton={<NavBarIconLeft onPress={this.state.handlerLeftMenu.bind(this)} />} />
                            <ParkingListView coordinate={this.state.payload} />
                        </SideMenu>
                    </View>
                </NativeRouter>
            );
        }
        // Render
        return (
            <NativeRouter onUpdate={this.onEnter}>
                <View style={styles.container}>
                    <SideMenu menu={menu} isOpen={this.state.isMenuOpen} onChange={this.onChangeMenuState.bind(this)}>
                        <NavigationBar
                            title={{title: this.state.titleNavbar}}
                            leftButton={
                                <NavBarIconLeft onPress={this.state.handlerLeftMenu.bind(this)} />
                            }
                        />

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
Object.assign(Router.prototype, Subscribable.Mixin);

module.exports = Router;

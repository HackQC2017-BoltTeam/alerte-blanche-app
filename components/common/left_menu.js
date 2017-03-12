import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Router, { Link } from 'react-router-native'

// Services
import UserService from '../services/user_service';

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22CFC1',
        marginTop: 20,
        height: '100%'
    },
    button: {
        padding: 10,
        backgroundColor: '#22CFC1',
        borderBottomWidth: 4,
        borderBottomColor: '#40549F',
        borderStyle: 'solid'
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#40549F'
    },
    iconLeftMenu: {
        width: 25,
        height: 26,
        marginRight: 5,
        marginTop: 6
    }
});

// View
class Menu extends Component {
    goTo(link) {
        this.props.goTo(link);
    }
    render() {
        return (
            <View style={styles.container}>
                <Link to="/" onPress={this.goTo.bind(this, 'welcome')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_home.png')} /> Accueil</Text></View></Link>
                {UserService.isLogged() ?
                    <View>
                        <Link to="/camera"  onPress={this.goTo.bind(this, 'camera')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_camera.png')} /> Signaler</Text></View></Link>
                        <Link to="/parking" onPress={this.goTo.bind(this, 'parking')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_car.png')} /> Parking</Text></View></Link>
                        <Link to="/profile" onPress={this.goTo.bind(this, 'profile')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_user.png')} /> Profil</Text></View></Link>
                        <Link to="/logout"  onPress={this.goTo.bind(this, 'logout')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_signout.png')} /> Logout</Text></View></Link>
                    </View> : null
                }
                {!UserService.isLogged() ?
                    <View>
                        <Link to="/login"           onPress={this.goTo.bind(this, 'login')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_signin.png')} /> Login</Text></View></Link>
                        <Link to="/subscription"    onPress={this.goTo.bind(this, 'subscription')}><View style={styles.button}><Text style={styles.buttonText}><Image style={styles.iconLeftMenu} source={require('../resources/left_menu/ic_user.png')} /> Register</Text></View></Link>
                    </View> : null
                }
            </View>
        );
    }
}

module.exports = Menu;

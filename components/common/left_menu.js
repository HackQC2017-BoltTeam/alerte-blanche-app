import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#40549F'
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
                <Link to="/" onPress={this.goTo.bind(this, 'welcome')}><View style={styles.button}><Text style={styles.buttonText}>Accueil</Text></View></Link>
                {UserService.isLogged() ?
                    <View>
                        <Link to="/camera"  onPress={this.goTo.bind(this, 'camera')}><View style={styles.button}><Text style={styles.buttonText}>Signaler</Text></View></Link>
                        <Link to="/parking" onPress={this.goTo.bind(this, 'parking')}><View style={styles.button}><Text style={styles.buttonText}>Parking</Text></View></Link>
                        <Link to="/profile" onPress={this.goTo.bind(this, 'profile')}><View style={styles.button}><Text style={styles.buttonText}>Profil</Text></View></Link>
                        <Link to="/logout"  onPress={this.goTo.bind(this, 'logout')}><View style={styles.button}><Text style={styles.buttonText}>Logout</Text></View></Link>
                    </View> : null
                }
                {!UserService.isLogged() ?
                    <View>
                        <Link to="/login"           onPress={this.goTo.bind(this, 'login')}><View style={styles.button}><Text style={styles.buttonText}>Login</Text></View></Link>
                        <Link to="/subscription"    onPress={this.goTo.bind(this, 'subscription')}><View style={styles.button}><Text style={styles.buttonText}>Register</Text></View></Link>
                    </View> : null
                }
            </View>
        );
    }
}

module.exports = Menu;

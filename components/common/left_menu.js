import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Router, { Link } from 'react-router-native'

// Services
import UserService from '../services/user_service';

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        marginTop: 20,
        height: '100%'
    },
    button: {
        fontSize: 18,
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#505050',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderStyle: 'solid'
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
                <Link to="/" onPress={this.goTo.bind(this, 'welcome')}><Text style={styles.button}>Home</Text></Link>
                {UserService.isLogged() ?
                    <View>
                        <Link to="/camera"  onPress={this.goTo.bind(this, 'camera')}><Text style={styles.button}>Signaler</Text></Link>
                        <Link to="/parking" onPress={this.goTo.bind(this, 'parking')}><Text style={styles.button}>Parking</Text></Link>
                        <Link to="/profile" onPress={this.goTo.bind(this, 'profile')}><Text style={styles.button}>Profile</Text></Link>
                        <Link to="/logout"  onPress={this.goTo.bind(this, 'logout')}><Text style={styles.button}>Logout</Text></Link>
                    </View> : null
                }
                {!UserService.isLogged() ?
                    <View>
                        <Link to="/login"           onPress={this.goTo.bind(this, 'login')}><Text style={styles.button}>Login</Text></Link>
                        <Link to="/subscription"    onPress={this.goTo.bind(this, 'subscription')}><Text style={styles.button}>Register</Text></Link>
                    </View> : null
                }
            </View>
        );
    }
}

module.exports = Menu;

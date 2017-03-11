import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'

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
        backgroundColor: '#505050'
    }
});

// View
class Menu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Link to="/"><Text style={styles.button}>Home</Text></Link>
                {UserService.isLogged() ?
                    <View>
                        <Link to="/camera"><Text style={styles.button}>Signaler</Text></Link>
                        <Link to="/map"><Text style={styles.button}>Parking</Text></Link>
                        <Link to="/profile"><Text style={styles.button}>Profile</Text></Link>
                        <Link to="/logout"><Text style={styles.button}>Logout</Text></Link>
                    </View> : null
                }
                {!UserService.isLogged() ?
                    <Link to="/login"><Text style={styles.button}>Login</Text></Link> : null
                }
            </View>
        );
    }
}

module.exports = Menu;

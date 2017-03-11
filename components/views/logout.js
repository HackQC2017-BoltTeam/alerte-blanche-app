// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect } from 'react-router-native'

// App imports
import UserService from '../services/user_service';


// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

// View
class LogoutView extends Component {
    render() {
        UserService.resetUser();
        return ( <Redirect to="/login" /> );
    }
}

module.exports = LogoutView;

// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

// App imports
import Menu from '../common/left_menu';
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

class ProfileView extends Component {
    render() {
        var user = UserService.getUser()
        return (
            <View style={styles.container}>
                <Text>Email: {user.email}</Text>
                <Text>Number of recompense</Text>
            </View>
        )
    }
}

module.exports = ProfileView;

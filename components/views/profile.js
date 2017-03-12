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
        backgroundColor: '#F5FCFF',
        padding: 20
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold'
    }
});

class ProfileView extends Component {
    render() {
        var user = UserService.getUser()
        return (
            <View style={styles.container}>
                <Text style={styles.username}>{user.first_name} {user.last_name}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Ma plaque: {user.plate_number}</Text>
                <Text>Nombre de signalement: {user.countReference} (Gain de {user.countReference * 5}$)</Text>
            </View>
        )
    }
}

module.exports = ProfileView;

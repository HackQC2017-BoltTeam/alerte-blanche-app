// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

// App imports
import Menu from '../common/left_menu';
import UserService from '../services/user_service';
import { Url } from '../common/constants';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#40549F',
        padding: 20
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 5
    }
});

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UserService.getUser()
        };
    }
    componentDidMount() {
        var user = UserService.getUser();
        fetch(Url.profile, {
            method: 'GET',
            headers: {
                'Cookies': user.cookie,
            }
        }).then((response) => {
            response.json().then((response) => {
                this.setState({user: response});
            });
        });
    }
    render() {
        var user = UserService.getUser();
        return (
            <View style={styles.container}>
                <Text style={styles.username}>{user.first_name} {user.last_name}</Text>
                <Text style={styles.label}>Email: {user.email}</Text>
                <Text style={styles.label}>Ma plaque: {user.plates[0].number}</Text>
                <Text style={styles.label}>Nombre de signalement: {this.state.user.signaling_count}</Text>
                <Text style={styles.label}>Gain: {this.state.user.signaling_count * 5}$</Text>
            </View>
        )
    }
}

module.exports = ProfileView;

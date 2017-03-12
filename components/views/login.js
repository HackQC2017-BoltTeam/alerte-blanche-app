// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect } from 'react-router-native'
import { Url } from '../common/constants';

// App imports
import UserService from '../services/user_service';


// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 50
    }
});

// View
class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'will@gmail.com',
            password: 'password',
            redirectToHome: false
        };
    }

    login() {
        // Prepare data
        var data = {
            email: this.state.email
        }
        // Fetch list parkings
        fetch(Url.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                UserService.setUser(response);
                this.setState({ redirectToHome: true });
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        // If logged, redirect to welcome page
        if (this.state.redirectToHome) {
            return ( <Redirect to="/" /> );
        }
        // Render
        return (
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email} />
                <Text>Mot de passe</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                    value={this.state.password} />
                <Button title="Valider" onPress={this.login.bind(this)} />
            </View>
        )
    }
}

module.exports = LoginView;

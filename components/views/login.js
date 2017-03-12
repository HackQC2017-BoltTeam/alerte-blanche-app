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
        backgroundColor: '#40549F',
        padding: 20
    },
    label: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        padding: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        marginBottom: 10
    },
    button: {
        color: '#FFFFFF',
        fontSize: 28,
        marginTop: 10
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
            var cookie = response.headers.map['set-cookie'][0];
            response.json().then((response) => {
                response.cookie = cookie;
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
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email} />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                    value={this.state.password} />
                <Button
                    color='#FFFFFF'
                    style={styles.button}
                    title="Valider"
                    onPress={this.login.bind(this)} />
            </View>
        )
    }
}

module.exports = LoginView;

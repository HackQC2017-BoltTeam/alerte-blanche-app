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
        backgroundColor: '#FFFFFF',
        padding: 50
    }
});

// View
class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'william57m@gmail.com',
            password: 'password',
            redirectToReferrer: false
        };
    }

    login() {
        var fakeUser = {
            email: 'william57m@gmail.com',
            plate: 'ABC 123',
            countReference: 2
        }
        UserService.setUser(fakeUser);
        this.setState({ redirectToReferrer: true });
    }

    render() {
        // If logged, redirect to welcome page
        if (this.state.redirectToReferrer) {
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

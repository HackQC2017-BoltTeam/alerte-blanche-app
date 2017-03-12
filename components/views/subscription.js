// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Router, { Link } from 'react-router-native'
import DismissKeyboard from 'dismissKeyboard';

// App imports
import Menu from '../common/left_menu';
import { Url } from '../common/constants';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#40549F',
        padding: 10
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
        backgroundColor: '#FFFFFF'
    },
    button: {
        color: '#FFFFFF',
        fontSize: 28,
    }
});

class SubscriptionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        };
    }
    validateSubscription(data) {
        fetch(Url.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                this.setState({validated: true});
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.validated ?
                    <ResultSubscription /> :
                    <FormSubscription validateSubscription={this.validateSubscription.bind(this)} />
                }
            </View>
        )
    }
}

class FormSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: '',
            // firstname: '',
            // lastname: '',
            // password: '',
            // plate: '',
            // phone: ''
            email: 'will1@gmail.com',
            firstname: 'Will',
            lastname: 'Mura',
            password: 'qwerty',
            plate: 'ABC-123',
            phone: '111-111-1111'
        };
    }
    validateSubscription() {
        var data = {
            email: this.state.email,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            plate_number: this.state.plate,
            telephone_number: this.state.phone
        };
        this.props.validateSubscription(data);
    }
    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }>
                <View style={styles.container}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email} />
                    <Text style={styles.label}>Firstname</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({firstname: text})}
                        value={this.state.firstname} />
                    <Text style={styles.label}>Lastname</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({lastname: text})}
                        value={this.state.lastname} />
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}
                        value={this.state.password} />
                    <Text style={styles.label}>Numero d&#39;immatriculation</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({plate: text})}
                        value={this.state.plate} />
                    <Text style={styles.label}>Cellulaire</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({phone: text})}
                        value={this.state.phone} />
                    <Button style={styles.button} color="#FFFFFF" title="Valider" onPress={this.validateSubscription.bind(this)} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class ResultSubscription extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Your account has been created</Text>
                <Link to="/login"><Text>Log me</Text></Link>
            </View>
        )
    }
}

module.exports = SubscriptionView;

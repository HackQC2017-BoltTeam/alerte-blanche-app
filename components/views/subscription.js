// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import SideMenu from 'react-native-side-menu';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class SubscriptionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        };
    }

    validateSubscription() {
        this.setState({validated: true});
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
            email: '',
            password: '',
            plate: ''
        };
    }

    validateSubscription() {
        this.props.validateSubscription(this.state.email, this.state.password, this.state.plate);
    }

    render() {
        var menu = <Menu navigator={this.props.navigator} />;
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
                <Text>Numero d&#39;immatriculation</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({plate: text})}
                    value={this.state.plate} />
                <Button title="Valider" onPress={this.validateSubscription.bind(this)} />
            </View>
        )
    }
}

class ResultSubscription extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Your account has been created</Text>
            </View>
        )
    }
}

module.exports = SubscriptionView;

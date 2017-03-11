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

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    login() {

    }

    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
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
                    <Button title="Valider" onPress={this.login} />
                </View>
            </SideMenu>
        )
    }
}

module.exports = LoginView;

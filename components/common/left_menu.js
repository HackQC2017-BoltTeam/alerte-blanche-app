import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

class Menu extends Component {
    goToPage(index) {
        this.props.navigator.replace({ id: index });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Home" onPress={this.goToPage.bind(this, 'welcome')} />
                <Button title="Signaler" onPress={this.goToPage.bind(this, 'camera')} />
                <Button title="Inscription" onPress={this.goToPage.bind(this, 'subscription')} />
                <Button title="Connexion" onPress={this.goToPage.bind(this, 'login')} />
                <Button title="Map" onPress={this.goToPage.bind(this, 'map')} />
            </View>
        );
    }
}

module.exports = Menu;

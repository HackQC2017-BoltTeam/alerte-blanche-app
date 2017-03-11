import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

// Style
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
});

class Menu extends Component {
    goToPage(index) {
        this.props.navigator.replace({ id: index });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Welcome Page" onPress={this.goToPage.bind(this, 'welcome')} />
                <Button title="Take Photo" onPress={this.goToPage.bind(this, 'camera')} />
            </View>
        );
    }
}

module.exports = Menu;

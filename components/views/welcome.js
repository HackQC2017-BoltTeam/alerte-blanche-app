// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

class WelcomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to HackQC 2017
                </Text>
                <Text>
                    We'll help you to find a parking
                </Text>
            </View>
        )
    }
}

module.exports = WelcomeView;

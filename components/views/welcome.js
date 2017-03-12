// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null
    },
});

// View
class WelcomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../resources/bg_main.png')} style={styles.backgroundImage} />
            </View>
        )
    }
}

module.exports = WelcomeView;

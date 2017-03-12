// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View, Image, WebView } from 'react-native';

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
class StatView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri: 'https://hoedic.carto.com/builder/f8f1d084-c9db-4f5b-a17f-79aeec2f3591/embed'}} style={{marginTop: 20}} />
            </View>
        )
    }
}

module.exports = StatView;

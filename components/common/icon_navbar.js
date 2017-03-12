import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';


// Style
const styles = StyleSheet.create({
    image: {
        margin: 10,
        width: 20,
        height: 20
    }
});

class LeftIcon extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image source={require('../resources/menu-icon.png')} style={styles.image} />
            </TouchableOpacity>
        );
    }
}

module.exports = LeftIcon;

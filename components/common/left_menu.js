import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class Menu extends Component {
    goToPage(index) {
        this.props.navigator.replace({ id: index });
    }

    render() {
        return (
            <View>
                <Button title="Welcome Page" onPress={this.goToPage.bind(this, 'first')} />
                <Button title="Take Photo" onPress={this.goToPage.bind(this, 'second')} />
            </View>
        );
    }
}

module.exports = Menu;

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

class CameraView extends Component {
    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <Text>
                        Second View
                    </Text>
                </View>
            </SideMenu>
        )
    }
}

module.exports = CameraView;

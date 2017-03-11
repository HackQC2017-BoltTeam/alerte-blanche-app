// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';

import AirMapView from 'react-native-maps';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

class MapView extends Component {
    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <AirMapView style={styles.map} />
                </View>
            </SideMenu>
        )
    }
}

module.exports = MapView;

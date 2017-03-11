// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';

import { MapView } from 'react-native';
// import MapView from 'react-native-maps';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

class MapPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [{
                latitude: 45.9397407,
                longitude: -72.6067841,
                animateDrop: true,
                title: 'Parking du bois'
            }]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} annotations={this.state.annotations} initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />
            </View>
        )
    }
}

module.exports = MapPageView;

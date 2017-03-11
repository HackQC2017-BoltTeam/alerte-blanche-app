// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navbar';

import { MapView } from 'react-native';
// import MapView from 'react-native-maps';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1
    },
    map: {
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
                latitude: this.props.parking.latitude,
                longitude: this.props.parking.longitude,
                animateDrop: true,
                title: this.props.parking.emplacement
            }],
            region: {
                latitude: this.props.parking.latitude,
                longitude: this.props.parking.longitude,
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    annotations={this.state.annotations}
                    region={this.state.mapRegion} />
            </View>
        )
    }
}

module.exports = MapPageView;

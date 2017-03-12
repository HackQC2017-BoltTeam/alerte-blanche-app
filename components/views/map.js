// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navbar';
import MapView from '../common/mapview'

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
    },
    navbar: {
        position: 'absolute',
        top: 50,
        left: 0
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
            },
            marker: {
                latitude: this.props.parking.latitude,
                longitude: this.props.parking.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                title: this.props.parking.emplacement,
                description: this.props.parking.emplacement,
            },
        }
    }
    render() {
        // Navigation Bar
        const leftButtonNavbar = {
            title: 'Back',
            handler: (() => { this.props.goBackFromMap(); })
        };
        return (
            <View style={styles.container}>
                <NavigationBar title={{title: 'Map'}} leftButton={leftButtonNavbar} style={styles.navbar} />
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    annotations={this.state.annotations}
                    region={this.state.marker}
                    >
                    {Platform.OS === 'ios' ?
                        null :
                        <MapView.Marker
                            coordinate={this.state.marker}
                            title={this.state.marker.title}
                            description={this.state.marker.description}
                        />
                    }
                </MapView>
            </View>
        )
    }
}

module.exports = MapPageView;

// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Linking, Button } from 'react-native';
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
        this.mapRef = null;
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
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            markers: [{
                latitude: this.props.parking.latitude,
                longitude: this.props.parking.longitude,
                title: this.props.parking.emplacement,
                description: this.props.parking.emplacement,
                identifier: 'parking',
            }],
        }
        if (this.props.coordinate) {
            this.state.markers.push({
                latitude: parseFloat(this.props.coordinate.latitude),
                longitude: parseFloat(this.props.coordinate.longitude),
                title: 'my car',
                description: 'move me',
                image: require('../resources/pin.png'),
                identifier: 'mycar',
            });
        }
    }

    componentDidMount() {
        if (this.props.coordinate) {
            animationTimeout = setTimeout(() => {
                this.mapRef.fitToSuppliedMarkers(['parking', 'mycar'], true);
            }, 2000);
        }
    }

    getDirections() {
        var lat1 = this.state.markers[0].latitude;
        var lon1 = this.state.markers[0].longitude;
        var lat2 = this.state.markers[1].latitude;
        var lon2 = this.state.markers[1].longitude;
        var url = 'http://maps.google.com/maps?saddr=' + lat1 + ',' + lon1;
        url += '&daddr=' + lat2 + ',' + lon2
        console.log(url);
        Linking.openURL(url);
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
                    ref={(ref) => { this.mapRef = ref }}
                    style={styles.map}
                    showsUserLocation={true}
                    region={this.state.region}
                    annotations={this.state.annotations}
                    >
                    {Platform.OS === 'ios' ?
                        null :
                        <View>
                            <MapView.Marker
                                coordinate={this.state.markers[0]}
                                title={this.state.markers[0].title}
                                description={this.state.markers[0].description}
                                identifier={this.state.markers[0].identifier}
                            />
                            {this.state.markers[1] ?
                                <MapView.Marker
                                    coordinate={this.state.markers[1]}
                                    title={this.state.markers[1].title}
                                    description={this.state.markers[1].description}
                                    image={this.state.markers[1].image}
                                    identifier={this.state.markers[1].identifier}
                                /> : null
                            }
                        </View>
                    }
                </MapView>
                {this.state.markers[1] ?
                    <Button style={styles.button} title="Directions" onPress={this.getDirections.bind(this)} /> :
                    null
                }
            </View>
        )
    }
}

module.exports = MapPageView;

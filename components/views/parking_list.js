// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import SideMenu from 'react-native-side-menu';

import { MapView } from 'react-native';

// App imports
import Menu from '../common/left_menu';
import MapPageView from './map';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    row: {
        borderBottomColor: '#D0D0D0',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        padding: 10
    },
    title: {
        fontSize: 18
    },
    description: {
        fontSize: 12
    }
});

class ParkingRow extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.openMap}>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        {this.props.parking.arrondissement} {this.props.parking.emplacement}
                    </Text>
                    <Text style={styles.description}>
                        Distance: {this.props.parking.distance.toFixed(2)}km | Nb places: {this.props.parking.nbr_place} | Gratuit: {this.props.parking.heures}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}


class ParkingListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentParking: null,
            parkings: [
                {
                    "arrondissement": "Outremont",
                    "distance": 0.2594359231187972,
                    "emplacement": "Sud du 5123, av. Durocher",
                    "heures": "21h à 7h",
                    "id_sta": 26,
                    "juridiction": "Municipale",
                    "latitude": 45.51839917,
                    "longitude": -73.59757466,
                    "nbr_place": 10,
                    "note_fr": ""
                }
            ]
        };
    }
    openMap(parking) {
        console.log(parking);
        this.setState({currentParking: parking});
    }
    render() {
        var parkinsRows = this.state.parkings.map((parking) => {
            return (
                <ParkingRow key={parking.id_sta} parking={parking} openMap={this.openMap.bind(this, parking) }/>
            );
        });
        if (this.state.currentParking) {
            return (
                <MapPageView parking={this.state.currentParking} />
            );
        }
        return (
            <ScrollView style={styles.container}>
                {parkinsRows}
            </ScrollView>
        )
    }
}

module.exports = ParkingListView;

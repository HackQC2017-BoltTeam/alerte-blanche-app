// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { MapView } from 'react-native';

// App imports
import Menu from '../common/left_menu';
import MapPageView from './map';
import { Url } from '../common/constants';

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
                        {this.props.parking.distance ?
                            <Text>Distance: {this.props.parking.distance.toFixed(2)}km |</Text> : null
                        }
                        Nb places: {this.props.parking.nbr_place} | Gratuit: {this.props.parking.heures}
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
            parkings: []
        };
    }
    componentDidMount() {
        // Fetch list parkings
        var url = Url.parkings
        if (this.props.coordinate) {
            url += '?longitude=' + this.props.coordinate.longitude.toString() + '&latitude=' + this.props.coordinate.latitude.toString();
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then((response) => {
                this.setState({parkings: response.data});
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    openMap(parking) {
        this.setState({currentParking: parking});
        // this.props.eventEmitter.emit('openMap');
    }
    goBackFromMap() {
        this.setState({currentParking: null});
    }
    render() {
        var parkingsRows = this.state.parkings.map((parking) => {
            return (
                <ParkingRow key={parking.id_sta} parking={parking} openMap={this.openMap.bind(this, parking)} />
            );
        });
        if (this.state.currentParking) {
            return (
                <MapPageView parking={this.state.currentParking} goBackFromMap={this.goBackFromMap.bind(this)} />
            );
        }
        return (
            <ScrollView style={styles.container}>
                {parkingsRows}
            </ScrollView>
        )
    }
}

module.exports = ParkingListView;

// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Camera from 'react-native-camera';

// App imports
import Menu from '../common/left_menu';
import { Url } from '../common/constants';
import UserService from '../services/user_service';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#40549F'
    },
    containerResult: {
        padding: 20,
        alignItems: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    label: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    inputContainer: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 3,
        borderStyle: 'solid',
        height: 40,
        width: 160,
        marginBottom: 20
    },
    input: {
        padding: 5,
        height: 36,
        color: '#FFFFFF',
        fontSize: 36,
        backgroundColor: '#40549F',
        textAlign: 'center'
    },
    containerButton: {
        alignItems: 'flex-end'
    },
    imgButton: {
        width: 30,
        height: 30,
        marginBottom: 30
    },
    button: {
        color: '#FFFFFF',
        fontSize: 28,
    },
    captureButton: {
        paddingBottom: 15
    }
});

class CameraView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureTook: false,
            sent: false,
            result: {},
            coordinate: {}
        }
    }
    componentDidMount() {
        // Get current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var data = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                }
                this.setState({coordinate: data});
            },
            (error) => {
                console.log(error.message)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    sendPlate(custom) {
        var user = UserService.getUser();
        var data = { plate_number: this.state.plate };
        if (this.state.coordinate) {
            data.longitude = this.state.coordinate.longitude;
            data.latitude = this.state.coordinate.latitude;
        }
        if (custom) {
            data.longitude = '-73.574828';
            data.latitude = '45.5253394';
        }
        fetch(Url.signal, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookies': user.cookie,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            this.setState({sent: true});
        }).catch((error) => {
            console.log(error);
        });
    }

    sendPicture(urlImage) {
        // Prepare data
        var photo = {
            uri: urlImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        var body = new FormData();
        body.append('file', photo);
        // Request
        fetch(Url.photo, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        }).then((response) => {
            response.json().then((response) => {
                var plateNumber = ''
                if (response && response.results && response.results.length) {
                    plateNumber = response.results[0].candidates[0].plate
                }
                this.setState({
                    result: response,
                    plate: plateNumber
                });
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    takePicture() {
        this.refs.camera.capture().then((data) => {
            this.sendPicture(data.path);
            this.setState({pictureTook: true});
        }).catch((err) => {
            console.error(err)
        });
    }
    bakeToPicture() {
        this.setState({pictureTook: false, sent: false});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.pictureTook ?
                    this.state.sent ?
                        <View style={styles.containerResult}>
                            <Text style={styles.label}>
                                Merci pour votre bonne action.
                            </Text>
                            <Text style={styles.label}>
                                Une notification a été envoyée au propriétaire du véhicule ayant la plaque suivante: {this.state.plate}
                            </Text>
                            <Button color="#FFFFFF" title="Recommencer" onPress={this.bakeToPicture.bind(this)} />
                        </View> :
                        <View style={styles.containerResult}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.plate}
                                    onChangeText={(text) => this.setState({plate: text})} />
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity onPress={this.bakeToPicture.bind(this)}>
                                    <Image style={styles.imgButton} source={require('../resources/left_menu/icon_refresh.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.sendPlate.bind(this, false)}>
                                    <Image style={styles.imgButton} source={require('../resources/left_menu/icon_send.png')} />
                                </TouchableOpacity>
                            </View>
                            <Button color="#FFFFFF" title="Envoyer (custom)" onPress={this.sendPlate.bind(this, true)} />
                        </View>
                    :
                    <Camera ref='camera' style={styles.preview} aspect={Camera.constants.Aspect.fill} captureTarget={Camera.constants.CaptureTarget.disk}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.takePicture.bind(this)}>
                            <Image source={require('../resources/icon-camera.png')} />
                        </TouchableOpacity>
                    </Camera>
                }
            </View>
        )
    }
}

module.exports = CameraView;

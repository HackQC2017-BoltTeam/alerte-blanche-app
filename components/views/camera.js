// Lib imports
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Camera from 'react-native-camera';

// App imports
import Menu from '../common/left_menu';
import { Url } from '../common/constants';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
    }
});

class CameraView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            result: {}
        }
    }

    sendPlate() {
        // fetch(Url.photo, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json'
        //     },
        //     body: body
        // }).then((response) => {
        //     response.json().then((response) => {
        //         this.setState({result: response});
        //     })
        // }).catch((error) => {
        //     console.log(error);
        // });
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
            this.setState({sent: true});
        }).catch((err) => {
            console.error(err)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.sent ?
                    <View>
                        <Text>
                            Est-ce correct ?
                        </Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            value={this.state.plate}
                            onChangeText={(text) => this.setState({plate: text})} />
                        <Button title="Envoyer" onPress={this.sendPlate.bind(this)} />
                    </View> :
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

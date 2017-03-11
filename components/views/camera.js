// Lib imports
import React, { Component } from 'react';
import { NativeModules, StyleSheet, Text, View } from 'react-native';
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
    sendPicture(urlImage) {
        var photo = {
            uri: urlImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        var body = new FormData();
        body.append('file', photo);
        fetch(Url.photo, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        }).then((response) => {
            response.json().then((response) => {
                this.setState({result: response});
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
                    <Text>
                        {JSON.stringify(this.state.result)}
                    </Text>:
                    <Camera ref='camera' style={styles.preview} aspect={Camera.constants.Aspect.fill} captureTarget={Camera.constants.CaptureTarget.disk}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                }
            </View>
        )
    }
}

module.exports = CameraView;

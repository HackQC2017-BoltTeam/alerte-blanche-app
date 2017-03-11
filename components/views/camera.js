// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Camera from 'react-native-camera';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
class CameraView extends Component {
    takePicture() {
        this.camera.capture().then((data) => {
            console.log(data)
        }).catch((err) => {
            console.error(err)
        });
    }

    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>
            </SideMenu>
        )
    }
}

module.exports = CameraView;

/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Menu from './components/common/left_menu';
import SideMenu from 'react-native-side-menu';


class FirstView extends Component {
    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Welcome to HackQC 2017
                    </Text>
                    <Text style={styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                    </Text>
                </View>
            </SideMenu>
        )
    }
}

class SecondView extends Component {
    render() {
        var menu = <Menu navigator={this.props.navigator} />;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Second View
                    </Text>
                </View>
            </SideMenu>
        )
    }
}

class MenuNavigator extends Component {
    constructor(props) {
        super(props);
    }
    renderScene(route, nav) {
        switch (route.id) {
            case 'first':
                return <FirstView navigator={nav} />;
            case 'second':
                return <SecondView navigator={nav} />;
            default:
                return <FirstView navigator={nav} />;
        }
    }
    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'first'}}
                renderScene={this.renderScene}
                configureScene={this.configureScene} />
        );
    }
}



export default class MobileApp extends Component {
    render() {
        return (
            <MenuNavigator />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('MobileApp', () => MobileApp);

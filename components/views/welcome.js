// Lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navbar';

// App imports
import Menu from '../common/left_menu';

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null
    },
    content: {
        marginTop: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 26,
        color: '#FFFFFF'
    },
    description: {
        padding: 30,
        fontSize: 16,
        alignItems: 'center',
        textAlign: 'justify'
    }
});


class WelcomeView extends Component {
    render() {
        const rightButtonConfig = {
            title: 'Menu',
            handler: () => alert('hello!'),
        };

        const titleConfig = {
            title: 'Bienvenue',
        };
        return (
            <View style={styles.container}>
                <Image source={require('../resources/bg_snow.jpg')} style={styles.backgroundImage}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Bienvenue sur Alerte Blanche
                        </Text>
                        <Text style={styles.description}>
                            Chaque année, plus de 30 000 véhicules sont remorqués pendant les opérations déneigement, à Montréal seulement. Pour les villes et les compagnies de déneigement, ça représente d'énormes dépenses logistiques. Pour les automobilistes, un beau gros ticket, et le plaisir d'avoir à récupérer sa voiture à l'autre bout de la ville.
                        </Text>
                    </View>
                </Image>
            </View>
        )
    }
}

module.exports = WelcomeView;

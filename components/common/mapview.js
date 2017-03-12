import { Platform } from 'react-native';
import MapView from 'react-native-maps';
import { MapView as MapViewIOS } from 'react-native';

if (Platform.OS === 'ios') {
    module.exports = MapViewIOS;
} else {
    module.exports = MapView;
}

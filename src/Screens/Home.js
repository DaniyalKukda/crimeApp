import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ToastAndroid , Alert} from 'react-native';
import { firebase } from "../Config/firebase";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Title, Logouticon } from "../../Components/headerOptions/options"
import MapView, {
  Marker
} from 'react-native-maps';
var foursquare = require('react-native-foursquare-api')({
  clientID: 'CX2R5CWI5BN4ABXIAHFPNXUNBCYX2DNUNARR2J0DQ3CNJ1QF',
  clientSecret: 'TVGXCVPXWLQW2DEVHRP25AIQYU5OF2SVZUM53RNRDNTLLTO3',
  style: 'foursquare', // default: 'foursquare'
  version: '20182507' //  default: '20140806'
});

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title navigation={navigation} />,
      headerRight: (
        <Logouticon />
      )
    }
  };
  state = {
    coords: { latitude: 24.8822179, longitude: 67.0652013 },
    visible: false
  }
  checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
      } else {
        this.props.navigation.navigate("Login")
      }
    })
  }
  getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let coords = { latitude: location.coords.latitude, longitude: location.coords.longitude }
    this.setState({ coords: coords }, () => this.getLocationName(location.coords.latitude, location.coords.longitude));
    let { user } = this.state
    let ob = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      phoneNumber: user.phoneNumber,
      uid: user.uid,
      coords
    }
    firebase.firestore().collection('users').doc(this.state.user.uid).set(ob).catch((err) => {
      alert(err.message)
    })

  }
  getLocationName = (lat, log) => {
    var params = {
      "ll": `${lat + "," + log}`,
    };
    foursquare.venues.getVenues(params)
      .then((venues) => {
        this.setState({
          locationName: venues.response.venues[0].location.address
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  robbed = () => {
    let { coords, locationName, user } = this.state;
    let timeStamp = new Date().getTime();
    let data = {
      coords,
      locationName,
      timeStamp,
      uid: user.uid,
      deviceName: Constants.deviceName
    }
    firebase.firestore().collection("Robbed").doc(user.uid).collection("myRobbed").doc().set(data).then((res) => {
      Alert.alert(
        'Crime location Recieved',
        'Do you want to put some Details now?',
        [
          {
            text: 'LATER',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'NOW', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    })

  }
  componentWillMount() {
    this.getLocation()
    this.checkAuth()
  }
  render() {
    const { coords, visible } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            region={
              {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            }
            style={{
              width: screen.width, height: screen.height
            }}
          >
            <Marker
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude
              }}
            />
          </MapView>
        </View>
        <Toast visible={visible} message="Press this Button a long" />
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style=
            {{
              backgroundColor: "#05204d",
              color: "#fff",
              padding: 10,
              margin: 10,
              marginTop: 30,
              borderRadius: 5
            }}
            onPress={() => this.setState({ visible: true })}
            onLongPress={() => this.robbed()}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#fff", letterSpacing: 5
            }}>Robbed!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home

import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Content, Card, CardItem, Left, Body, Right } from 'native-base';
import { Title, Logouticon } from "../../Components/headerOptions/options";
import { firebase } from "../Config/firebase"
import MapView, {
  Marker
} from 'react-native-maps';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Allrobbed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title navigation={navigation} />,
      headerRight: (
        <Logouticon />
      )
    }
  };
  state = {
    robbery: [],
  }
  fetchRobbery = () => {
    let arr = []
    firebase.firestore().collectionGroup("myRobbed").onSnapshot(vale => {
      vale.forEach((doc) => {
        let docid = doc.id;
        let data = doc.data();
        arr.push(data)
      })
      this.setState({
        robbery: arr
      })
    })
  }
  componentDidMount() {
    this.fetchRobbery()
  }
  render() {
    let { robbery } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf:"center" ,marginTop: 20, fontSize: 25, fontWeight: "600" }} >All Robbed</Text>
        <Content>
          {
            robbery.map((ele , i) => {
              let date = new Date(ele.timeStamp)
              let day = date.getDay();
              let month = date.getMonth();
              let year = date.getFullYear();
              let hour = date.getHours();
              let minut = date.getMinutes()
              return <Card key={i} cardBody style={{ marginTop: 30 }}>
                <CardItem>
                  <MapView
                    showsUserLocation={true}
                    followsUserLocation={true}
                    region={
                      {
                        latitude: ele.coords.latitude,
                        longitude: ele.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }
                    }
                    style={{
                      width: 320, height: 200
                    }}
                  >
                    <Marker
                      ref={marker => {
                        this.marker = marker;
                      }}
                      coordinate={{
                        latitude: ele.coords.latitude,
                        longitude: ele.coords.longitude
                      }}
                    />
                  </MapView>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>{ele.deviceName}</Text>
                  </Left>
                  <Body>
                    <Text>{ele.locationName}</Text>
                  </Body>
                  <Right>
                    <Text>{year}-{month}-{day} {hour}:{minut}</Text>
                  </Right>
                </CardItem>
              </Card>
            })
          }
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Allrobbed


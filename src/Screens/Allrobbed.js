import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Title, Logouticon } from "../../Components/headerOptions/options"

class Allrobbed extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Title navigation={navigation} />,
      headerRight: (
        <Logouticon />
      )
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Allrobbed</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Allrobbed

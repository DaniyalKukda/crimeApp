import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Title, Logouticon } from "../../Components/headerOptions/options"
import { firebase } from "../Config/firebase"


class Crimeinfo extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Title navigation={navigation} />,
            headerRight: (
                <Logouticon />
            )
        }
    };
    state = {
        timeStamp: {},
        Whathappend: ""

    }
    fetchRobbery = () => {
        let deviceName = this.props.navigation.getParam('deviceName', 'default value')
        var uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Robbed").doc(uid).collection("myRobbed").onSnapshot(vale => {
            vale.forEach((doc) => {
                let docid = doc.id;
                let data = doc.data();
                if (data.deviceName == deviceName) {
                    this.setState({
                        timeStamp: data.timeStamp,
                        docid
                    })
                }
            })
        })
    }
    submitData = () => {
        let { Whathappend, docid } = this.state;
        var uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Robbed").doc(uid).collection("myRobbed").doc(docid)
        .update({
            Whathappend
          })
          alert("info is updated")
          this.props.navigation.navigate("Home")
    }
    componentDidMount() {
        this.fetchRobbery()
    }
    render() {
        let { timeStamp } = this.state
        let date = new Date(timeStamp)
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minut = date.getMinutes()
        return (
            <View style={styles.container}>
                <Text style={{ marginTop: 20, fontSize: 22, fontWeight: "600" }}>Robber Date : {year}-{month}-{day} {hour}:{minut} </Text>
                <TextInput
                    multiline={true}
                    placeholder="What happend?"
                    numberOfLines={5}
                    maxLength={1500}
                    style={{
                        marginTop: 20, fontSize: 18, borderColor: "gray", borderStyle: "solid", borderWidth: 2, width: 320
                        , padding: 10, borderRadius: 10
                    }}
                    onChangeText={(e) => this.setState({ Whathappend: e })}
                />
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
                    onPress={this.submitData}
                >
                    <Text style={{
                        fontSize: 22, textAlign: "center", color: "#fff", letterSpacing: 5
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center"
    },
});

export default Crimeinfo

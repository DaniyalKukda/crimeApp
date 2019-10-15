import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { firebase } from '../src/Config/firebase';

class Menu extends React.Component {
    state = {
        user: ""
    }
    checkAuth = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })
            } else {
                // No user is signed in.
                this.props.navigation.navigate("Login")
            }
        })
    }
    componentDidMount() {
        this.checkAuth()
    }
    navlinks(nav, text) {
        return (
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.links}>{text}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        let { user } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.picView}>
                            <Image style={styles.profilePic} source={{uri : user.photoURL }} />
                        </View>
                        <View style={styles.profileText}>
                            <Text style={styles.displayName}>{user.displayName}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomLinks}>
                    {this.navlinks("Home", "Home")}
                    {this.navlinks("Mydevices", "My Devices")}
                    {this.navlinks("Myrobbed", "My Robbed")}
                    {this.navlinks("Allrobbed", "All Robbed")}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    profile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#777777"
    },
    picView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    profilePic: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    profileText: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center"
    },
    displayName: {
        fontSize: 20,
        paddingBottom: 5,
        color: "#05204d",
        textAlign:"left",
    }
    ,
    links: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: "left",
        color: "#fff"
    },
    topLinks: {
        height: 140,
        backgroundColor: "white"
    },
    bottomLinks: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 450,
        backgroundColor: "#05204d"
    }
});

export default Menu
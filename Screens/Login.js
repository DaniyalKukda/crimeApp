import React from 'react';
import { StyleSheet, View, Image, Text, Platform, Modal, Button , Linking , AppState} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { facebookLogin, firebase } from "../Config/firebase.js"
import { updateUser } from "../Redux/action";
import { connect } from "react-redux";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';
class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        errorMessage: null,
        isLocationModalVisible: false,
        appState : AppState.currentState
    };

    checkAuth() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Home")
            } else {
                // No user is signed in.
                this.props.navigation.navigate("Login")
            }
        })
    }
    componentWillUnmount(){
        AppState.removeEventListener('change' , this.handleAppStateChange)
    }
    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            this._getLocationAsync();
          }
          this.setState({ appState: nextAppState });
    }
    componentWillMount() {
        AppState.addEventListener('change' , this.handleAppStateChange)
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
                return;
            }
        } catch (error) {
            let status = Location.getProviderStatusAsync();
            if (!status.locationServicesEnabled) {
                this.setState({ isLocationModalVisible: true })
            }
        }
    };
    componentDidMount() {
        this.checkAuth()
    }
    loginWithFacebook = async () => {
        const {
            type,
            token
        } = await Facebook.logInWithReadPermissionsAsync('258671385038577', {
            permissions: ['public_profile'],
        })
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            try {
                const user = await facebookLogin(token);
            } catch (e) {
                console.log('e ===>', e)
            }
        }
    }
    openSetting = () => {
        if(Platform.OS == 'ios'){
            Linking.openURL("app-settings:")
        }else{
            IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
            )
        }
        this.setState({openSettings:false})
    }
    render() {
        if (this.state.errorMessage) {
            console.log(this.state.errorMessage,"fail")
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isLocationModalVisible}
                    onRequestClose={() => this.state.openSettings ? this.openSetting : undefined}
                >
                    <View
                        style={{ width: 300, height: 300, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}
                    >
                        <Button
                            title="Enabled Location Services"
                            onPress={() => this.setState({ isLocationModalVisible: false, openSettings: true })}
                        />
                    </View>
                </Modal>
                <View>
                    <Image source={require("../assets/logo.jpg")} style={styles.Logo} />
                    <Text style={styles.title}>CRIME APP</Text>
                </View>
                <View style={styles.Buttons}>
                    <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.loginWithFacebook()} >
                        Login with Facebook
                    </FontAwesome.Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05204d',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    Logo: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginLeft: 25
    },
    Buttons: {
        width: 280,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 10,
        color: "#fff"
    }
});
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}
export default connect(null, mapDispatchToProps)(Login)

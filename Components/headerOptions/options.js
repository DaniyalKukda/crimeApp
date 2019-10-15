import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { signOut } from "../../src/Config/firebase"

function Title(props) {
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                <Image source={require("../../assets/logo.jpg")} style={{ width: 40, height: 40, borderRadius: 40, marginLeft: 15 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: "700", fontSize: 30, marginLeft: 5, marginTop: 4, color: "#05204d" }}>APP</Text>
        </View>
    )
}
function Logouticon(props) {
    return (
        <Entypo name="log-out" style={{ marginRight: 15 }} size={32} color="#05204d" onPress={() => signOut(props)} />
    )
}

export {
    Title,
    Logouticon
}
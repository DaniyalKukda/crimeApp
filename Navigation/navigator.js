import React from "react";
import * as Screens from "../Screens/index";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MenuDrawer from "../Components/Menu";

const StackNavigator = createStackNavigator({
  Home: {
    screen: Screens.Home
  },
  Mydevices: {
    screen: Screens.Mydevices
  },
  Myrobbed: {
    screen: Screens.Myrobbed
  },
  Allrobbed: {
    screen: Screens.Allrobbed
  }
}

)
const StackNavigatorLogincreen = createStackNavigator({
  Login: {
    screen: Screens.Login
  }
})
const Drawer = createDrawerNavigator({
  Home: StackNavigator,
  Mydevices: StackNavigator,
  Myrobbed: StackNavigator,
  Allrobbed: StackNavigator
}, {
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />
  }
})
const SwitchNavigator = createSwitchNavigator({
  Login: StackNavigatorLogincreen,
  Home: Drawer
})
const Navigator = createAppContainer(SwitchNavigator)

export default Navigator;
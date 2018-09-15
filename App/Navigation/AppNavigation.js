import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'
import SettingsScreen from '../Containers/SettingsScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import DrawerHeader from '../Components/DrawerHeader'
import { View, SafeAreaView, Button } from 'react-native'
import React from 'react'
import styles from './Styles/NavigationStyles'
const AppDrawer = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      path: 'profile/:credentials'
    },
    SettingsScreen: { screen: SettingsScreen }
  },
  {
    // Default config for all screens
    contentComponent: props => {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerHeader
              bannerImage={props.screenProps.user.bannerImage}
              profileImage={props.screenProps.user.profileImage}
              name={props.screenProps.user.baseUsername}
            />
            <DrawerItems {...props} />
            <Button
              title='Logout'
              onPress={props.screenProps.logout}
            />
          </SafeAreaView>
        </View>
      )
    },
    initialRouteName: 'ProfileScreen',
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)
const AuthStack = createStackNavigator(
  { SignIn: LaunchScreen },
  {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

const PrimaryNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: {
      screen: AppDrawer,
      path: 'user'
    },
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default PrimaryNav

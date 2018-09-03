import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'
import EmojiSelectorScreen from '../Containers/EmojiSelectorScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import { View, SafeAreaView, Button, AsyncStorage } from 'react-native'
import React from 'react'
import styles from './Styles/NavigationStyles'

const _logout = async () => {
  // todo Add API Call
  await AsyncStorage.removeItem('accessToken')
}
const AppDrawer = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      path: 'profile/:credentials'
    },
    EmojiSelectorScreen: { screen: EmojiSelectorScreen },
    SettingsScreen: { screen: SettingsScreen }
  },
  {
    // Default config for all screens
    contentComponent: props => {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title='Logout'
              onPress={() => {
                _logout()
                props.navigation.navigate('Auth')
              }}
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

import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import { View, SafeAreaView, Button, AsyncStorage } from 'react-native'
import React from 'react'
import styles from './Styles/NavigationStyles'
import API from '../../App/Services/Api'

const _logout = async () => {
  // todo Add API Call
  await AsyncStorage.removeItem('accessToken')
}

const AppDrawer = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      path: 'profile/:credentials'
    }
  },
  {
    // Default config for all screens
    contentComponent: props => (
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
    ),
    headerMode: 'none',
    initialRouteName: 'ProfileScreen',
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
    App: AppDrawer,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default PrimaryNav

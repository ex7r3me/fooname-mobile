import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

const AppDrawer = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      path: 'profile/:credentials'
    }
  },
  {
    // Default config for all screens
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

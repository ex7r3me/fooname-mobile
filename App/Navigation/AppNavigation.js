import { createDrawerNavigator } from 'react-navigation'
import ProfileScreen from '../Containers/ProfileScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    path: 'profile/:credentials'
  },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

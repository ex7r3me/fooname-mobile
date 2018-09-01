import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings'
  }

  render () {
    const props = this.props
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={element => {
            props.navigation.openDrawer()
          }}
          centerElement='Settings'
          onRightElementPress={label => {
            console.log(label)
          }}
        />
        <View>
          <View style={styles.section}>
            <Button
              raised
              primary
              style={styles.button}
              text='Save Setting'
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

import React, { Component } from 'react'
import { AsyncStorage, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    const { navigation } = this.props
    const credentials = JSON.stringify(navigation.getParam('credentials'))
    if (credentials) {
      this._storeAccessToken(credentials)
    } else { this._retrieveData() }
    this.state = {
      credentials
    }
  }
  _storeAccessToken = async (accesstoKen) => {
    try {
      await AsyncStorage.setItem('accessToken', accesstoKen)
    } catch (error) {
        // Error saving data
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if (value !== null) {
      // We have data!!
        this.setState({credentials: value})
      }
    } catch (error) {
    // Error retrieving data
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>User Profile</Text>
          <Text>{this.state.credentials}</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

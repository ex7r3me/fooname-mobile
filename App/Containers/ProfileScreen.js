import React, { Component } from 'react'
import { Text, AsyncStorage, View } from 'react-native'
import { withFormik } from 'formik'
import API from '../../App/Services/Api'
import { Toolbar, Button } from 'react-native-material-ui'
import styles from './Styles/ProfileScreenStyle'
import { Emoji } from 'emoji-mart-native'

import _ from 'lodash'
let accessToken
const enhancer = withFormik({
  handleSubmit: (values, actions) => {
    let api = API.create()
    const cityId = values.cityId
    api.saveCityId(cityId, accessToken)
  }
})

class ProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile'
  }
  constructor (props) {
    super(props)
    const { navigation } = this.props
    const credentials = JSON.stringify(navigation.getParam('credentials'))
    if (credentials) {
      this._storeAccessToken(credentials)
    } else {
      this._boot()
    }
    this.state = {
      credentials,
      locationButton: false,
      latitude: null,
      longitude: null,
      error: null,
      profile: {
        baseUsername: null,
        cityId: null,
        cityName: null,
        createDate: null,
        updateDate: null,
        realm: null,
        username: null,
        emoji: 'sunny'
      }
    }
  }
  _boot = async () => {
    await this._retrieveData()
    await this._getProfile()
  }
  _logout = async () => {
    try {
      let api = API.create()
      await api.logout(this.state.credentials)
      await AsyncStorage.removeItem('accessToken')
      this._retrieveData()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      // Error saving data
    }
  }
  _getProfile = async () => {
    try {
      const api = API.create()
      const result = await api.getProfile(this.state.credentials)
      const profile = _.get(result, 'data', {})
      this.setState({ profile })
    } catch (error) {
      // Error saving data
    }
  }
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationButton: true,
          error: null
        })
      },
      error => {
        console.log(error)
        this.setState({ error: error.message, locationButton: false })
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  }
  _saveCoordination = async () => {
    let api = API.create()
    const { latitude, longitude } = this.state
    const result = await api.patchByCoordination(
      latitude,
      longitude,
      accessToken
    )
    const profile = result.data
    console.log(profile)
    this.setState({ profile })
  }
  _storeAccessToken = async accesstoKen => {
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
        let credentials = value.replace(/['"]+/g, '')
        this.setState({ credentials })
        accessToken = credentials
      } else {
        this.setState({ credentials: null })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render () {
    let props = this.props
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={element => {
            props.navigation.openDrawer()
          }}
          centerElement='Profile'
          onRightElementPress={label => {
            console.log(label)
          }}
        />
        <View>
          <View style={styles.section}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Emoji
                set={'twitter'}
                emoji={_.get(this.state, 'profile.emoji', 'sunny')}
                size={64}
                fallback={emoji => {
                  return `:${emoji.short_names[0]}:`
                }}
              />
            </View>
            <Text>{_.get(this.state, 'profile.baseUsername', '')}</Text>
            <Text>City Name: {_.get(this.state, 'profile.cityName', '')}</Text>

            <Text>{this.state.credentials}</Text>
            <Button
              raised
              primary
              style={styles.button}
              onPress={this._saveCoordination}
              text='Save By Location'
            />
            <Button
              raised
              accent
              text='Emoji Selector'
              onPress={() => {
                this.props.navigation.navigate('EmojiSelectorScreen')
              }}
            />
          </View>

        </View>
      </View>
    )
  }
}

export default enhancer(ProfileScreen)

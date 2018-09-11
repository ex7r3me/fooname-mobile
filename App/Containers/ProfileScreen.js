import React, { Component } from 'react'
import { Text, AsyncStorage, View, Image } from 'react-native'
import API from '../../App/Services/Api'
import { Toolbar, Button } from 'react-native-material-ui'
import styles from './Styles/ProfileScreenStyle'
import { Emoji, Picker } from 'emoji-mart-native'
import UserActions from '../Redux/UserRedux'
import { connect } from 'react-redux'
import _ from 'lodash'
let accessToken

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
      showEmojiPicker: false,
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
  addEmoji = async emojiObj => {
    let emoji = emojiObj.id
    let api = API.create()
    const result = await api.patchEmoji(emoji, accessToken)
    const profile = result.data
    this.setState({ profile, showEmojiPicker: false })
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
    let EmojiPicker = null
    if (this.state.showEmojiPicker) {
      EmojiPicker = (
        <Picker
          onPressClose={() => this.setState({ showEmojiPicker: false })}
          set='twitter'
          onSelect={this.addEmoji}
        />
      )
    }

    return (
      <View style={styles.mainContainer}>
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
        {EmojiPicker}

        <View>
          <View style={styles.section}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={{width: 64, height: 64}}
                source={{uri: _.get(this.state, 'profile.profileImage')}} />

              <Emoji
                set={'twitter'}
                emoji={_.get(this.state, 'profile.emoji') || 'sunny'}
                size={64}
                fallback={emoji => {
                  return `:${emoji.short_names[0]}:`
                }}
              />
            </View>
            <Text>{_.get(this.state, 'profile.baseUsername', '')}</Text>
            <Text>City Name: {_.get(this.state, 'profile.cityName', '')}</Text>
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
                this.setState({ showEmojiPicker: true })
                // this.props.navigation.navigate('EmojiSelectorScreen')
              }}
            />
            <Button
              raised
              primary
              text='get profile'
              onPress={() => {
                this.props.getProfile()
              }}
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
const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(UserActions.profileRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
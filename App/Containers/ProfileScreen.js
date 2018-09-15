import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import API from '../../App/Services/Api'
import { Toolbar, Button } from 'react-native-material-ui'
import styles from './Styles/ProfileScreenStyle'
import { Emoji, Picker } from 'emoji-mart-native'
import UserActions from '../Redux/UserRedux'
import UpdateUserActions from '../Redux/UpdateUserRedux'
import AuthActions from '../Redux/AuthRedux'
import { connect } from 'react-redux'
import _ from 'lodash'

class ProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile'
  }
  constructor (props) {
    super(props)
    const { navigation } = this.props
    const credentials = navigation.getParam('credentials')
    if (credentials) {
      this.props.setAccessToken(credentials)
    }
    this.state = {
      showEmojiPicker: false,
      credentials,
      locationButton: false,
      latitude: null,
      longitude: null,
      error: null
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
  addEmoji = (emojiObj) => {
    const emoji = emojiObj.id
    this.props.saveProfile({emoji})
    this.setState({showEmojiPicker: false})
  }
  _saveCoordination = async () => {
    let api = API.create()
    const { latitude, longitude } = this.state
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
                source={{uri: _.get(this.props, 'profile.profileImage')}} />

              <Emoji
                set={'twitter'}
                emoji={_.get(this.props, 'profile.emoji') || 'sunny'}
                size={64}
                fallback={emoji => {
                  return `:${emoji.short_names[0]}:`
                }}
              />
            </View>
            <Text>{_.get(this.props, 'profile.baseUsername', '')}</Text>
            <Text>City Name: {_.get(this.props, 'profile.cityName', '')}</Text>
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
  const user = state.user
  return {
    profile: {
      baseUsername: user.baseUsername,
      cityId: user.cityId,
      cityName: user.cityName,
      createDate: user.createDate,
      updateDate: user.updateDate,
      realm: user.realm,
      username: user.username,
      emoji: user.emoji
    }
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveProfile: (profile) => dispatch(UpdateUserActions.updateUserRequest(profile)),
  getProfile: () => dispatch(UserActions.profileRequest()),
  setAccessToken: (accessToken) => dispatch(AuthActions.authSuccess(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

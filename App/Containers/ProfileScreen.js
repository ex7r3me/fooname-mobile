import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import data from 'emoji-mart-native/data/twitter.json'
import dataRequires from '../assets/emojis/twitter'
import styles from './Styles/ProfileScreenStyle'
import { Emoji, NimblePicker } from 'emoji-mart-native'
import UserActions from '../Redux/UserRedux'
import UpdateUserActions from '../Redux/UpdateUserRedux'
import AuthActions from '../Redux/AuthRedux'
import { connect } from 'react-redux'
import _ from 'lodash'
const {emojis: localEmojis} = dataRequires

class ProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile'
  }
  constructor (props) {
    super(props)
    const credentials = this.props.navigation.getParam('credentials')
    if (credentials) {
      this.props.setAccessToken(credentials)
    }
    this.state = {
      showEmojiPicker: false
    }
  }
  componentDidMount () {

  }
  addEmoji = (emojiObj) => {
    const emoji = emojiObj.id
    this.props.saveProfile({emoji})
    this.setState({showEmojiPicker: false})
  }
  render () {
    let EmojiPicker = null
    let activityIndicator = null
    if (this.state.showEmojiPicker) {
      EmojiPicker = (
        <NimblePicker
          onPressClose={() => this.setState({ showEmojiPicker: false })}
          set='twitter'
          data={data}
          useLocalImages={localEmojis}
          onSelect={this.addEmoji}
        />
      )
    }
    if (this.props.showActivityIndicator) {
      activityIndicator = <ActivityIndicator size='large' color='#0000ff' />
    }
    return (
      <View style={styles.mainContainer}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={element => {
            this.props.navigation.openDrawer()
          }}
          centerElement='Profile'
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
              disabled={!this.props.hasLocation}
              style={styles.button}
              text='Save By Location'
            />
            <Button
              raised
              accent
              disabled={this.props.fetchingProfile}
              text='Emoji Selector'
              onPress={() => {
                this.setState({ showEmojiPicker: true })
              }}
            />
            {activityIndicator}
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const user = state.user
  const updateUser = state.updateUser
  const location = state.location
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
    },
    hasLocation: location.hasLocation,
    fetchingProfile: updateUser.fetching,
    showActivityIndicator: updateUser.fetching || location.fetching
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveProfile: (profile) => dispatch(UpdateUserActions.updateUserRequest(profile)),
  getProfile: () => dispatch(UserActions.profileRequest()),
  setAccessToken: (accessToken) => dispatch(AuthActions.authSuccess(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

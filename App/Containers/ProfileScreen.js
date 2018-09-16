import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
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
    console.log(this.props)
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
            this.props.navigation.openDrawer()
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
              disabled={!this.props.hasLocation}
              style={styles.button}
              text='Save By Location'
            />
            <Button
              raised
              accent
              text='Emoji Selector'
              onPress={() => {
                this.setState({ showEmojiPicker: true })
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
    hasLocation: location.hasLocation
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveProfile: (profile) => dispatch(UpdateUserActions.updateUserRequest(profile)),
  getProfile: () => dispatch(UserActions.profileRequest()),
  setAccessToken: (accessToken) => dispatch(AuthActions.authSuccess(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

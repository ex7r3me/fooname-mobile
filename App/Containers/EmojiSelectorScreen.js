import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from 'emoji-mart-native'
import { Toolbar } from 'react-native-material-ui'
import API from '../../App/Services/Api'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EmojiSelectorScreenStyle'
let accessToken

class EmojiSelectorScreen extends Component {
  constructor (props) {
    super(props)
    this._retrieveData()
  }
  static navigationOptions = {
    drawerLabel: 'Emoji'
  }

  addEmoji = async emojiObj => {
    let emoji = emojiObj.id
    let api = API.create()
    const result = await api.patchEmoji(emoji, accessToken)
    const profile = result.data
    this.setState({ profile })
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if (value !== null) {
        // We have data!!
        let credentials = value.replace(/['"]+/g, '')
        accessToken = credentials
      } else {
        this.setState({ credentials: null })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={element => {
            this.props.navigation.openDrawer()
          }}
          centerElement='Emoji'
          onRightElementPress={label => {
            console.log(label)
          }}
        />
        <Text>Please select the emoji you would like to use</Text>
        <Picker set='twitter' onSelect={this.addEmoji} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmojiSelectorScreen)

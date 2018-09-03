import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from 'emoji-mart-native'
import { Toolbar } from 'react-native-material-ui'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EmojiSelectorScreenStyle'

class EmojiSelectorScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Emoji'
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
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

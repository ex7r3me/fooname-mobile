import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, ImageBackground } from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import styles from './Styles/DrawerHeaderStyle'

export default class DrawerHeader extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.section}>
        <ImageBackground style={styles.header}
          source={{uri: this.props.bannerImage}}
        >
          <UserAvatar style={styles.avatar}
            size='64'
            name={this.props.name || 'Foo Name'}
            src={this.props.profileImage} />
        </ImageBackground>

      </View>
    )
  }
}

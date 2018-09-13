import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, SafeAreaView, Button } from 'react-native'
import { DrawerItems } from 'react-navigation'

import styles from './Styles/DrawerContentComponentStyle'

export default class DrawerContentComponent extends Component {

  render () {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
          <Button
            title='Logout'
            onPress={() => {
            }}
            />
        </SafeAreaView>
      </View>
    )
  }
}

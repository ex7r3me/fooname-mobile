import React, { Component } from 'react'
import { View } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { Container, Content, Text } from 'native-base'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Container>
          <Content>
            <Text>
            Welcome to fooName
          </Text>
          </Content>
        </Container>
      </View>
    )
  }
}

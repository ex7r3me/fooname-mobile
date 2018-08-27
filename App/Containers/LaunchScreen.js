import React, { Component } from 'react'
import { ScrollView, Text, Linking, View } from 'react-native'
import {
  Container,
  Header,
  Left,
  Content,
  Icon,
  Title,
  Body,
  Right,
  Button
} from 'native-base'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  }
  openProfileScreen = credentials => {
    this.props.navigation.navigate('ProfileScreen', { credentials })
  }
  render () {
    return (
      <Container style={styles}>
        <Header>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
              <View style={styles.section}>
                <View style={styles.centered}>
                  <Text>Welcome to fooName</Text>
                  <Text>Login with Twitter to continue</Text>
                </View>
                <Button
                  light
                  large
                  block
                  style={styles.button}
                  onPress={() => {
                    Linking.openURL('http://127.0.0.1:8080/api/auth/twitter')
                  }}
                >
                  <Text>Login with Twitter</Text>
                </Button>
                <Button
                  light
                  large
                  block
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.navigate('ProfileScreen')
                  }}
                >
                  <Text>Profile</Text>
                </Button>
                <Button
                  light
                  large
                  block
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.navigate('ProfileScreen', {
                      credentials: 'why not?'
                    })
                  }}
                >
                  <Text>Profile set</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </Content>
      </Container>
    )
  }
}

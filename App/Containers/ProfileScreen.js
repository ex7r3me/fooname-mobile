import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Toast, Container, Header, Content, Form, Item, Input, Text, Left, Icon, Body, Title } from 'native-base'
import { Button, TextInput, View } from 'react-native'
import { withFormik } from 'formik'
import API from '../../App/Services/Api'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
let accessToken
const enhancer = withFormik(
  {
    handleSubmit: (values, actions) => {
      let api = API.create()
      const cityId = values.cityId
      api.saveCityId(cityId, accessToken)
    }
  }
)

class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    const { navigation } = this.props
    const credentials = JSON.stringify(navigation.getParam('credentials'))
    if (credentials) {
      this._storeAccessToken(credentials)
    } else {
      this._retrieveData()
    }
    this.state = { credentials, latitude: null, longitude: null, error: null }
  }
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      error => {
        Toast.show({
          text: error.message
        })
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }
  _storeAccessToken = async accesstoKen => {
    try {
      await AsyncStorage.setItem('accessToken', accesstoKen)
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if (value !== null) {
        // We have data!!
        let credentials = value.replace(/['"]+/g, '')
        this.setState({ credentials })
        accessToken = credentials
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render () {
    let props = this.props
    return <Container>
      <Header>
        <Body>
          <Title>Profile</Title>
        </Body>
      </Header>
      <Content>
        <Text>Here > </Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>{this.state.error}</Text>
        <Text>User Profile</Text>
        <Text>{this.state.credentials}</Text>
        <TextInput onChangeText={props.handleChange('cityId')} onBlur={props.handleBlur('cityId')} value={props.values.cityId} />
        <Button onPress={props.handleSubmit} title='Submit' />
      </Content>
    </Container>
  }
}

export default enhancer(ProfileScreen)

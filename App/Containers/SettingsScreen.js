import React, { Component } from 'react'
import { View, CheckBox } from 'react-native'
import { Formik } from 'formik'
import { Toolbar, Button, Text } from 'react-native-material-ui'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {
  state = {
    autoUpdate: false
  }
  static navigationOptions = {
    drawerLabel: 'Settings'
  }
  handleSubmit = () => {

  }
  render () {
    const props = this.props
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={element => {
            props.navigation.openDrawer()
          }}
          centerElement='Settings'
        />
        <View>
          <View style={styles.section}>
            <Formik
              onSubmit={values => this.handleSubmit(values)}
          >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <CheckBox
                    value={this.state.autoUpdate}
                    onValueChange={() => this.setState({ autoUpdate: !this.state.autoUpdate })}
                      />
                  <Button
                    onPress={handleSubmit}
                    raised
                    primary
                    class='ma-2'
                    disabled={this.props.isFetching}
                    text='Save Settings'
                />
                </View>
            )}
            </Formik>

          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

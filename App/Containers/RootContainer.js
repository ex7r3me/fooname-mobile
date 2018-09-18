import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { Snackbar } from 'react-native-material-ui'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import SnackbarActions from '../Redux/SnackbarRedux'
import ReduxPersist from '../Config/ReduxPersist'
  // Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation
        />
        <Snackbar {...this.props.snackbar} onRequestClose={this.props.closeSnackbar} actionText='Ok' onActionPress={this.props.closeSnackbar} />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = state => {
  const snackbar = state.snackbar.snackbar
  return {
    snackbar
  }
}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  closeSnackbar: () => dispatch(SnackbarActions.snackbarClose())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)

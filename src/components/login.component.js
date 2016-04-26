import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import * as actions from '../state/app.action';

// Components
import Message from './message.component';

const {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch
} = React;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  loginElement: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
  textInput: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
  },
  loginWarning: {
    color: 'red'
  },
  buttonContainer: {
    backgroundColor: '#1F64A6',
    padding: 15,
    marginTop: 30,
    borderRadius: 4,
  },
  button: {
    color: 'white'
  },
  newUserSwitchContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  switchLabel: {
    alignSelf: 'center',
    paddingRight: 40
  }
});


class Login extends React.Component {
  constructor(props) {
    super(props);
    this._updateUsername = this._updateUsername.bind(this);
    this._updatePassword = this._updatePassword.bind(this);
    this._updateVerifiedPassword = this._updateVerifiedPassword.bind(this);
    this._isNewUser = this._isNewUser.bind(this);
    this._handleLogin = this._handleLogin.bind(this);

    this.state = {
      username: '',
      password: '',
      verifiedPassword: '',
      isNewUser: false,
      usernameDublicate: false,
      passwordMismatch: false,
    };
  }

  componentDidUpdate() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      Actions.app();
    }
  }

  _updateUsername(username) {
    this.setState({ username });
  }
  _updatePassword(password) {
    this.setState({ password });
  }
  _updateVerifiedPassword(verifiedPassword) {
    this.setState({ verifiedPassword });
  }
  _isNewUser(isNewUser) {
    this.setState({ isNewUser });
  }
  _handleLogin() {
    const { registerUser, loginUser } = this.props;
    const username = _.trim(this.state.username);
    const password = _.trim(this.state.password);
    if (this.state.isNewUser) {
      registerUser(username, password);
    } else {
      loginUser(username, password);
    }
  }
  _getVerifyPassBlock() {
    const styleCombination = this.state.passwordMismatch
      ? [styles.loginWarning]
      : [];
    return {
      header: <Text style={ styleCombination }>Verify Password:</Text>,
      textInput: <TextInput
        style={ [styles.textInput, styles.loginElement] }
        onChangeText={ this._updateVerifiedPassword }
        autoCapitalize="none"
        autoCorrect={ false }
        secureTextEntry={ true }
      />
    };
  }

  render() {
    const verifyPass = this.state.isNewUser ? this._getVerifyPassBlock() : {};
    return (
      <View style={ styles.container }>
        <Message/>
        <Text style={ this.state.usernameDublicate ? styles.loginWarning : null }>Username:</Text>
        <TextInput
          style={ [styles.textInput, styles.loginElement] }
          onChangeText={ this._updateUsername }
          autoCapitalize="none"
          autoCorrect={ false }
        />
        <Text>Password:</Text>
        <TextInput
          style={ [styles.textInput, styles.loginElement] }
          onChangeText={ this._updatePassword }
          autoCapitalize="none"
          autoCorrect={ false }
          secureTextEntry={ true }
        />

        { verifyPass.header }
        { verifyPass.textInput }

        <Text>{this.state.username}</Text>
        <Text>{this.state.password}</Text>

        <View style={ [styles.newUserSwitchContainer, styles.loginElement] }>
          <Text style={ styles.switchLabel }>Are you a new user?</Text>
          <Switch
            onValueChange={(value) => this._isNewUser(value)}
            value={this.state.isNewUser}
          />
        </View>

        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this._handleLogin }
        >
          <Text style={ styles.button }>{this.state.isNewUser ? "Register" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect(
  state => ({
    loggedIn: state.userSession
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Login);

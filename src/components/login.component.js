import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../state/app.action';

const {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PropTypes,
  Switch
} = React;

const propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
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
      isNewUser: true,
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
    const { registerUser } = this.props;
    if (this.state.isNewUser) {
      const a = registerUser(this.state.username, this.state.password);
    } else {
      // Do normal login
    }
  }
  _getVerifyPassBlock() {
    const styleCombination = this.state.passwordMismatch
      ? [styles.loginWarning]
      : [];
    return {
      header: <Text style={ styleCombination }>Verify Password:</Text>,
      textInput: <TextInput
        style={ styles.textInput }
        onChangeText={ this._updateVerifiedPassword }
      />
    };
  }

  render() {
    const verifyPass = this.state.isNewUser ? this._getVerifyPassBlock() : {};
    return (
      <View style={ styles.container }>
        <Text style={ this.state.usernameDublicate ? styles.loginWarning : null }>Username:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ this._updateUsername }
        />
        <Text>Password:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ this._updatePassword }
        />
        { verifyPass.header }
        { verifyPass.textInput }

        <Text>{this.state.username}</Text>
        <Text>{this.state.password}</Text>

        <Text>Are you a new user?</Text>
        <Switch
          onValueChange={(value) => this._isNewUser(value)}
          value={this.state.isNewUser}
        />
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

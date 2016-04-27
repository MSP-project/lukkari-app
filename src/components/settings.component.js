import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import * as actions from '../state/app.action';

// Components
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './spinner.component';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 80,
    flexDirection: 'column'
  },
  settingHeader: {
    flex: 1,
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  settingHeaderLeft: {
    color: '#888',
    marginLeft: 8,
    fontSize: 16,
  },
  settingHeaderRight: {
    color: '#888',
    marginRight: 8,
    fontSize: 12,
  },
  courseItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopColor: '#eee',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'red',
  },
  courseItemText: {
    flex: 1,
  },
  courseItemBtn: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const propTypes = {
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  removeCourse: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this._renderCourseItem = this._renderCourseItem.bind(this);
    this._logout = this._logout.bind(this);
  }

  removeCourse(courseCode) {
    if (!this.props.loading) this.props.removeCourse(courseCode);
  }

  _renderCourseItem(data) {
    const { loading } = this.props;
    const { course } = data;
    const { code, name } = course;
    const removeIcon = <Icon name='ios-trash-outline' size={24} color='#444'/>

    return (
      <View
        key={code}
        style={ styles.courseItem }
      >
        <Text style={ styles.courseItemText }>
          {`${code} - ${name}`}
        </Text>
        <TouchableOpacity
          style={ styles.courseItemBtn }
          onPress={this.removeCourse.bind(this, code)}
        >
          {loading
            ? <Spinner spinnerSize='small'/>
            : removeIcon
          }
        </TouchableOpacity>
      </View>
    );
  }

  _logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity
          onPress={this._logout}
          style={styles.button}
        >
          <Text style={ styles.buttonText }>Logout</Text>
        </TouchableOpacity>

        {this.props.courses.length
          ? (
            <View style={ styles.settingHeader }>
              <Text style={ styles.settingHeaderLeft }>Your courses:</Text>
              <Text style={ styles.settingHeaderRight }>unfollow</Text>
            </View>
          )
          : null
        }

        {this.props.courses.map(this._renderCourseItem)}
      </View>
    );
  }
}

Settings.propTypes = propTypes;

export default Settings;

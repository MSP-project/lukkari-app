import React from 'react-native';
import { Actions } from 'react-native-router-flux';


const {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

class Home extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={{ marginBottom: 50 }}>This is the Home page</Text>
        <TouchableOpacity onPress={ Actions.spaceMap }>
          <Text
            style={{ justifyContent: 'center', margin: 20, textAlign: 'center', color: 'blue' }}
          > Take me to the Space Map </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ Actions.counter }>
          <Text
            style={{ justifyContent: 'center', margin: 20, textAlign: 'center', color: 'blue' }}
          > Take me to the Counter </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


module.exports = Home;

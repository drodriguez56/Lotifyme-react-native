import React, { Component } from 'react';
import { TouchableOpacity,
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity 
            onPress={Actions.register}
            style={styles.button}
          >
            <Text style={styles.buttonText}> 
              continue with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={Actions.login}
            style={styles.button}
          >
            <Text style={styles.buttonText}> 
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
};
export default Root;

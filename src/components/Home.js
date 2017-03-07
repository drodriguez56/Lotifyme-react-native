import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import { ACCESS_TOKEN } from '../../constants';

class Home extends Component {
  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      Actions.auth({ type: ActionConst.RESET });
    } catch (error) {
      console.log('something whent wrong');
    }
  }
  render() {
    return (
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: 80 }}>
           <TouchableOpacity
            onPress={this.removeToken}
           >
              <Text>
                Logout
              </Text>
            </TouchableOpacity>
          <Text>
            Home view
          </Text>
          </View>
        </View>
      );
  }
}

export default Home;

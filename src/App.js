import React, { Component } from 'react';
import { View } from 'react-native';

import Register from './components/Register';

class App extends Component {
  render() {
    return (
          <View style={{ flex: 1 }}>
            <Register />
          </View>
      );
  }
}

export default App;

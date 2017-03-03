import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore,
  applyMiddleware,
  compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { View } from 'react-native';

import reducers from './reducers';

import Register from './components/Register';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
      applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        ),
    );
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <Register />
          </View>
        </Provider>
      );
  }
}

export default App;

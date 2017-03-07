import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

import Root from './components/Root';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import { ACCESS_TOKEN } from '../constants';

const loggerMiddleware = createLogger();

let store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

class Lotifyme extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: false, loading: true };
  }
  componentWillMount() {
    let tokenPromise = this.getToken();
    tokenPromise.then(token => {
      if (token) {
        this.setState({ loggedIn: true, loading: false });
        Actions.main({ type: ActionConst.RESET });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      return token;
    } catch (error) {
      console.log('something whent wrong');
    }
  }

  render() {
    return (
        <Provider store={store}>
          <Router>
            <Scene key='auth' >
              <Scene key="welcome" component={Root} hideNavBar />
              <Scene key="login" component={Login} title="Login" hideNavBar={false} />
              <Scene key="register" component={Register} title="Register" hideNavBar={false} />
            </Scene>
            <Scene key="main" tabs={true} >
              <Scene key="tab1" icon={TabIcon} initial title="Home" >
                  <Scene key="home" component={Home} title='Your Picks' />
              </Scene>
            </Scene>
          </Router>
        </Provider>
      );
  }
}
class TabIcon extends React.Component {
    render() {
        return (
            <Text style={{ color: this.props.selected ? 'red' : 'black' }}>{this.props.title}</Text>
        );
    }
}
export default Lotifyme;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import * as actions from '../actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  async onRegisterPressed() {
    let { email, password, passwordConfirmation } = this.state;
    this.props.signupUser({ email, password, passwordConfirmation });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          style={styles.input} 
          placeholder='Email'
        />
        <TextInput
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
          placeholder='Password'
          secureTextEntry
        />
        <TextInput
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({ passwordConfirmation: text })}
          style={styles.input}
          placeholder='Confirm Password'
          secureTextEntry
        />
        <TouchableOpacity onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableOpacity>

        <Errors errors={this.props.auth.errors} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {console.log(props)}
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
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
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
};
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, actions)(Register);

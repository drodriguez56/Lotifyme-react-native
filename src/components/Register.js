import React, { Component } from 'react';
import {
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: [],
      showProgress: false,
    };
  }

  async onRegisterPressed() {
    try {
      let response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      });

      let res = await response;
      let responseText = await response.text();

      if (response.status >= 200 && response.status < 300) {
        console.log(res.headers.get('access-token'));
      } else {
        let error = responseText;
        throw error;
      }
    } catch (error) {
      let formErrors = JSON.parse(error).errors.full_messages;
      this.setState({ errors: formErrors });
    }
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
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={this.state.errors} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
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

export default Register;

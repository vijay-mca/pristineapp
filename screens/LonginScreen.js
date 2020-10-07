import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ButtonComponent from './components/ButtonComponent';
import {connect} from 'react-redux';
import {authenticate} from '../redux/action/authAction';

class LonginScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  goRegister = () => {
    this.props.navigation.navigate('Register');
  };

  handleLogin = () => {
    if (this.state.email === '') {
      Alert.alert('Validation', 'Email is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.password === '') {
      Alert.alert('Validation', 'Password is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      this.props.authenticate(
        this.state.email,
        this.state.password,
        this.props.navigation,
      );
    }
  };
  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (this.props.auth.loading) {
      return (
        <Fragment>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <View style={styles.container}>
          <View
            style={{backgroundColor: 'black', width: '90%', marginLeft: '5%'}}>
            <View style={styles.formGroup}>
              <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Email"
                style={styles.formControl}
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
                value={this.state.email}
                ref={(input) => {
                  this.textInput = input;
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Password"
                style={styles.formControl}
                onChangeText={(password) => {
                  this.setState({password: password});
                }}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.description}>
                your details are safe with us and will not be passed on
              </Text>
            </View>
            <View style={styles.formGroup}>
              <ButtonComponent
                title="Login"
                onPress={() => {
                  this.handleLogin();
                }}
              />
            </View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 15,
                textDecorationLine: 'underline',
              }}
              onPress={this.goRegister}>
              Register
            </Text>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  formGroup: {
    padding: 10,
  },
  formControl: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  title: {
    color: '#C7A23A',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
  },
});

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState, {authenticate})(LonginScreen);

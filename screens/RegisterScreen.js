import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ButtonComponent from './components/ButtonComponent';
import {connect} from 'react-redux';
import {register} from '../redux/action/authAction';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      name: '',
      contact: '',
      email: '',
      password: '',
      type: Platform.OS,
    };
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  goLogin = () => {
    this.props.navigation.navigate('Login');
  };

  handleRegister = () => {
    if (this.state.name.trim() === '') {
      Alert.alert('Validation', 'Name is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.contact.trim() === '') {
      Alert.alert('Validation', 'Contact number is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.email.trim() === '') {
      Alert.alert('Validation', 'Email is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email.trim())
    ) {
      Alert.alert('Validation', 'Invalid email', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.password.trim() === '') {
      Alert.alert('Validation', 'Password is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      this.props.register(
        this.state.name,
        this.state.contact,
        this.state.email,
        this.state.password,
        this.state.type,
        this.props.navigation,
      );
    }
  };

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
          {/* <View style={{alignItems: 'center'}}>
            <Image source={require('./img/logo.png')} resizeMode="contain" />
          </View> */}
          <View
            style={{backgroundColor: 'black', width: '90%', marginLeft: '5%'}}>
            <View style={styles.formGroup}>
              <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Name"
                style={styles.formControl}
                value={this.state.name}
                onChangeText={(name) => {
                  this.setState({name: name});
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Contact Number"
                style={styles.formControl}
                value={this.state.contact}
                onChangeText={(contact) => {
                  this.setState({contact: contact});
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Email"
                style={styles.formControl}
                value={this.state.email}
                onChangeText={(email) => {
                  this.setState({email: email});
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                placeholder="Password"
                style={styles.formControl}
                secureTextEntry={true}
                onChangeText={(password) => {
                  this.setState({password: password});
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.description}>
                your details are safe with us and will not be passed on
              </Text>
            </View>
            <View style={styles.formGroup}>
              <ButtonComponent
                title="Register"
                onPress={() => {
                  this.handleRegister();
                }}
              />
            </View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 15,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}
              onPress={this.goLogin}>
              Login
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

export default connect(mapState, {register})(RegisterScreen);

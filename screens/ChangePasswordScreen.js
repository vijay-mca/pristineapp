/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import ButtonComponent from './components/ButtonComponent';
import {changePassword, myAccount} from '../redux/action/authAction';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      oldPass: '',
      currentPass: '',
      newPass1: '',
      newPass2: '',
    };
  }

  componentDidMount() {
    this.isMounted = true;
    let {uniqueId, memId, memberDetails} = this.props.auth;
    this.props.myAccount(uniqueId, memId);
    if (Object.keys(memberDetails).length > 0) {
      this.setState({
        currentPass: memberDetails.password,
      });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    let {uniqueId, memId, memberDetails} = this.props.auth;

    if (
      Object.keys(prevProp.auth.memberDetails).length !==
      Object.keys(memberDetails).length
    ) {
      this.props.myAccount(uniqueId, memId);
      if (Object.keys(memberDetails).length > 0) {
        this.setState({
          currentPass: memberDetails.password,
        });
      }
    }
    if (prevProp.auth.memberDetails.password !== memberDetails.password) {
      this.props.myAccount(uniqueId, memId);
      if (Object.keys(memberDetails).length > 0) {
        this.setState({
          currentPass: memberDetails.password,
        });
      }
    }
  }

  handleChangePassword = () => {
    let {oldPass, newPass1, newPass2, currentPass} = this.state;

    if (oldPass === '') {
      Alert.alert('Validation', 'Old password is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (newPass1 === '') {
      Alert.alert('Validation', 'New password is required', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (newPass2 === '') {
      Alert.alert(
        'Validation',
        'Confirm password is required',
        [{text: 'Ok'}],
        {
          cancelable: true,
        },
      );
    } else if (newPass1 !== newPass2) {
      Alert.alert('Validation', 'Password not Match', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (currentPass !== oldPass) {
      Alert.alert(
        'Validation',
        'Old Password do not match with new password',
        [{text: 'Ok'}],
        {
          cancelable: true,
        },
      );
    } else if (currentPass === newPass1) {
      Alert.alert(
        'Validation',
        'Old password same as new password try different',
        [{text: 'Ok'}],
        {
          cancelable: true,
        },
      );
    } else {
      this.props.changePassword(
        oldPass,
        newPass1,
        this.props.auth.memId,
        this.props.auth.uniqueId,
      );

      this.setState({
        oldPass: '',
        newPass1: '',
        newPass2: '',
      });
    }
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading} = this.props.auth;
    const {oldPass, newPass1, newPass2} = this.state;
    if (loading) {
      return (
        <Fragment>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Fragment>
      );
    }

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>change password</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Old Password</Text>
              <TextInput
                placeholder="Old Password"
                style={styles.formControl}
                value={oldPass}
                onChangeText={(oldPass) => this.setState({oldPass})}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                placeholder="New Password"
                style={styles.formControl}
                value={newPass1}
                onChangeText={(newPass1) => this.setState({newPass1})}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                style={styles.formControl}
                value={newPass2}
                onChangeText={(newPass2) => this.setState({newPass2})}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.formGroup}>
              <ButtonComponent
                title="Save Password"
                onPress={() => {
                  this.handleChangePassword();
                }}
              />
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#D3C499',
    color: 'white',
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 10,
    padding: 5,
  },
  label: {
    color: 'black',
    padding: 3,
  },
  formControl: {
    width: '100%',
    padding: 5,
    color: '#495057',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myAccount: (uniqueId, memId) => dispatch(myAccount(uniqueId, memId)),
    changePassword: (oldPass, newPass, memId, uniqueId) =>
      dispatch(changePassword(oldPass, newPass, memId, uniqueId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);

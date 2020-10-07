import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {contact} from '../redux/action/contentAction';
import ButtonComponent from './components/ButtonComponent';
import {myAccount} from '../redux/action/authAction';

class ContactScreen extends Component {
  static propTypes = {
    contact: PropTypes.func.isRequired,
    myAccount: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      memId: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    };
  }

  componentDidMount() {
    this.isMounted = true;
    let {memId, uniqueId, memberDetails, countryOptions} = this.props.auth;

    this.props.myAccount(uniqueId, memId);
    if (Object.keys(memberDetails).length > 0 && countryOptions.length > 0) {
      this.setState({
        memId: memberDetails.mem_id,
        firstName: memberDetails.mem_name,
        lastName: memberDetails.mem_lname,
        email: memberDetails.email_id,
        phoneNumber: memberDetails.mobile_no,
      });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    let {memId, uniqueId, memberDetails, countryOptions} = this.props.auth;
    if (
      Object.keys(memberDetails).length !==
        prevProp.auth.memberDetails.length &&
      countryOptions.length !== Object.keys(prevProp.auth.countryOptions).length
    ) {
      this.props.myAccount(uniqueId, memId);
      if (Object.keys(memberDetails).length > 0 && countryOptions.length > 0) {
        this.setState({
          memId: memberDetails.mem_id,
          firstName: memberDetails.mem_name,
          lastName: memberDetails.mem_lname,
          email: memberDetails.email_id,
          phoneNumber: memberDetails.mobile_no,
        });
      }
    }
  }

  handleContact = () => {
    if (this.state.firstName.trim() === '') {
      Alert.alert(
        'Validation',
        'First Name should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.lastName.trim() === '') {
      Alert.alert('Validation', 'Surname should not be empty', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.phoneNumber.trim() === '') {
      Alert.alert(
        'Validation',
        'Phone Number should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.message.trim() === '') {
      Alert.alert('Validation', 'Message should not be empty', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      this.props.contact(
        this.props.auth.uniqueId,
        this.props.auth.memId,
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.email,
        this.state.message,
      );
    }
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.props.cms.loading) {
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
      <Fragment>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>contact us</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChangeText={(val) => {
                    this.setState({firstName: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Last Nme</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Surname"
                  value={this.state.lastName}
                  onChangeText={(val) => {
                    this.setState({lastName: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={(val) => {
                    this.setState({email: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChangeText={(val) => {
                    this.setState({phoneNumber: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Message"
                  value={this.state.message}
                  onChangeText={(val) => {
                    this.setState({message: val});
                  }}
                  multiline={true}
                  numberOfLines={2}
                />
              </View>

              <View style={styles.formGroup}>
                <ButtonComponent
                  title="Submit"
                  onPress={() => {
                    this.handleContact();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Fragment>
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
  cms: state.cms,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myAccount: (unique_id, member_id) =>
      dispatch(myAccount(unique_id, member_id)),
    contact: (
      unique_id,
      member_id,
      first_name,
      last_name,
      phone_number,
      email,
      message,
    ) =>
      dispatch(
        contact(
          unique_id,
          member_id,
          first_name,
          last_name,
          phone_number,
          email,
          message,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);

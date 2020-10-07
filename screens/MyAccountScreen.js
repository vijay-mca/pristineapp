import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  AppState,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import ButtonComponent from './components/ButtonComponent';
import {connect} from 'react-redux';
import {myAccount, updateAccount} from '../redux/action/authAction';

class MyAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      memId: '',
      firstName: '',
      surName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      city: '',
      state: '',
      postCode: '',
      country: '',
      appState: AppState.currentState,
    };
  }

  async componentDidMount() {
    this.isMounted = true;
    //AppState.addEventListener('change', this._handleAppStateChange);
    this.props.myAccount(this.props.auth.uniqueId, this.props.auth.memId);
    let {memberDetails} = this.props.auth;
    if (Object.keys(memberDetails).length > 0) {
      this.setState({
        memId: memberDetails.mem_id,
        firstName: memberDetails.mem_name,
        surName: memberDetails.mem_lname,
        email: memberDetails.email_id,
        phoneNumber: memberDetails.mobile_no,
        addressLine1: memberDetails.address_line1,
        city: memberDetails.city,
        state: memberDetails.state,
        postCode: memberDetails.postcode,
        country: memberDetails.country,
      });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
    //AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProp, prevState) {
    let {memberDetails, uniqueId, memId} = this.props.auth;
    if (
      Object.keys(prevProp.auth.memberDetails).length !==
      Object.keys(memberDetails).length
    ) {
      this.props.myAccount(uniqueId, memId);
      if (Object.keys(memberDetails).length > 0) {
        this.setState({
          memId: memberDetails.mem_id,
          firstName: memberDetails.mem_name,
          surName: memberDetails.mem_lname,
          email: memberDetails.email_id,
          phoneNumber: memberDetails.mobile_no,
          addressLine1: memberDetails.address_line1,
          city: memberDetails.city,
          state: memberDetails.state,
          postCode: memberDetails.postcode,
          country: memberDetails.country,
        });
      }
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    } else {
      nextAppState === 'inactive';
    }
    this.setState({appState: nextAppState});
  };

  handleUpdate = () => {
    if (this.state.firstName.trim() === '') {
      Alert.alert(
        'Validation',
        'First Name should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.surName.trim() === '') {
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
    } else if (this.state.addressLine1.trim() === '') {
      Alert.alert(
        'Validation',
        'Address Line1 should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.city.trim() === '') {
      Alert.alert('Validation', 'City should not be empty', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else if (this.state.state.trim() === '') {
      Alert.alert(
        'Validation',
        'Country / State should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.postCode.trim() === '') {
      Alert.alert(
        'Validation',
        'Zip / Postal Code should not be empty',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } else if (this.state.country.trim() === '') {
      Alert.alert('Validation', 'Select your Country', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      this.props.updateAccount(
        this.state.memId,
        this.state.firstName,
        this.state.surName,
        this.state.phoneNumber,
        this.state.addressLine1,
        this.state.city,
        this.state.state,
        this.state.postCode,
        this.state.country,
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
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>my account</Text>
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
                <Text style={styles.label}>Surname</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Surname"
                  value={this.state.surName}
                  onChangeText={(val) => {
                    this.setState({surName: val});
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
                  editable={false}
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
                <Text style={styles.label}>Address Line 1</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Address Line 1"
                  value={this.state.addressLine1}
                  onChangeText={(val) => {
                    this.setState({addressLine1: val});
                  }}
                  multiline={true}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="City"
                  value={this.state.city}
                  onChangeText={(val) => {
                    this.setState({city: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Country / State"
                  value={this.state.state}
                  onChangeText={(val) => {
                    this.setState({state: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Postcode</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Zip / Postal Code"
                  value={this.state.postCode}
                  onChangeText={(val) => {
                    this.setState({postCode: val});
                  }}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Country</Text>
                <View style={{borderWidth: 1, backgroundColor: '#fff'}}>
                  <Picker
                    selectedValue={this.state.country}
                    onValueChange={(val) => {
                      this.setState({country: val});
                    }}>
                    <Picker.Item label="--Select Country--" value="" />
                    {this.props.auth.countryOptions.length > 0 &&
                      this.props.auth.countryOptions.map((co, key) => (
                        <Picker.Item
                          label={co.toString()}
                          value={co.toString()}
                          key={key}
                        />
                      ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.formGroup}>
                <ButtonComponent
                  title="Update"
                  onPress={() => {
                    this.handleUpdate();
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

const mapState = (state) => ({
  auth: state.auth,
});

const mapProp = (dispatch) => {
  return {
    myAccount: (unique_id, member_id) =>
      dispatch(myAccount(unique_id, member_id)),
    updateAccount: (
      memId,
      firstName,
      surName,
      phoneNumber,
      addressLine1,
      city,
      state,
      postCode,
      country,
    ) =>
      dispatch(
        updateAccount(
          memId,
          firstName,
          surName,
          phoneNumber,
          addressLine1,
          city,
          state,
          postCode,
          country,
        ),
      ),
  };
};

export default connect(mapState, mapProp)(MyAccountScreen);

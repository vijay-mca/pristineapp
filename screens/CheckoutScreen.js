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
  Image,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import ButtonComponent from './components/ButtonComponent';
import {connect} from 'react-redux';
import {myAccount} from '../redux/action/authAction';
import {
  myCart,
  cartSummary,
  countryPaymentOpt,
  checkout,
} from '../redux/action/cartAction';
import {currency} from '../config/const';

class CheckoutScreen extends Component {
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
      paymentGateway: '',
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    let {memId, uniqueId, memberDetails} = this.props.auth;
    let {paymentDft, countryOptions} = this.props.cart;

    this.props.myCart(uniqueId);
    this.props.cartSummary(uniqueId);
    this.props.countryPaymentOpt();
    this.setState({
      paymentGateway: paymentDft,
    });
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

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    let {memId, uniqueId, memberDetails} = this.props.auth;
    let {
      paymentDft,
      countryOptions,
      paymentOptions,
      totalQty,
      totalPrice,
    } = this.props.cart;

    if (
      countryOptions.length !== prevProp.cart.countryOptions.length ||
      paymentOptions.length !== prevProp.cart.paymentOptions.length ||
      paymentDft !== prevProp.cart.paymentDft
    ) {
      this.props.countryPaymentOpt();
      this.setState({
        paymentGateway: paymentDft,
      });
    }

    if (
      Object.keys(memberDetails).length !==
      Object.keys(prevProp.auth.memberDetails).length
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

    if (
      totalQty !== prevProp.cart.totalQty &&
      totalPrice !== prevProp.cart.totalPrice
    ) {
      this.props.myCart(uniqueId);
      this.props.cartSummary(uniqueId);
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

  handleCheckout = () => {
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
    } else if (this.state.paymentGateway.trim() === '') {
      Alert.alert('Validation', 'Select Payment Option', [{text: 'Ok'}], {
        cancelable: true,
      });
    } else {
      this.props.checkout(
        this.props.auth.uniqueId,
        this.state.firstName,
        this.state.surName,
        this.state.phoneNumber,
        this.state.email,
        this.state.addressLine1,
        this.state.city,
        this.state.state,
        this.state.postCode,
        this.state.country,
        this.state.paymentGateway,
        this.props.auth.memId,
        this.props.cart.orderTotal,
        this.props.navigation,
      );
    }
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading, myCart, subTotal} = this.props.cart;

    if (loading) {
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
              <Text style={styles.title}>checkout</Text>
            </View>
            <View style={{padding: 15, width: '100%'}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                shipping address
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                borderWidth: 1,
                marginLeft: '5%',
                marginRight: '5%',
                borderColor: 'rgba(0, 0, 0, 0.3)',
              }}>
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
                    {this.props.cart.countryOptions.length > 0 &&
                      this.props.cart.countryOptions.map((co, key) => (
                        <Picker.Item
                          label={co.toString()}
                          value={co.toString()}
                          key={key}
                        />
                      ))}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={{padding: 15, width: '100%'}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                my basket
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                borderWidth: 1,
                marginLeft: '5%',
                marginRight: '5%',
                borderColor: 'rgba(0, 0, 0, 0.3)',
              }}>
              <View style={{width: '35%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    padding: 10,
                  }}>
                  My Basket
                </Text>
              </View>
              <View style={{width: '25%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    padding: 10,
                  }}>
                  QTY
                </Text>
              </View>
              <View style={{width: '20%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    padding: 10,
                  }}>
                  Price
                </Text>
              </View>
              <View style={{width: '20%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    padding: 10,
                  }}>
                  Total Price
                </Text>
              </View>
            </View>
            {myCart.length > 0 &&
              myCart.map((mc, key) => (
                <Fragment key={key}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      marginLeft: '5%',
                      marginRight: '5%',
                      borderColor: 'rgba(0, 0, 0, 0.3)',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: mc.image, cache: 'force-cache'}}
                        resizeMode="contain"
                        style={{width: '50%', height: 50}}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>
                        {mc.pro_title}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          {
                            color: 'black',
                            textAlignVertical: 'center',
                            backgroundColor: '#D3C499',
                            padding: 5,
                          },
                        ]}>
                        {mc.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>
                        {currency} {mc.price}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>
                        {currency} {mc.total_price}
                      </Text>
                    </View>
                  </View>
                </Fragment>
              ))}
            {myCart.length > 0 && (
              <Fragment>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    borderWidth: 1,
                    marginLeft: '5%',
                    marginRight: '5%',
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#e2e2e2',
                  }}>
                  <View style={{width: '80%'}}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'right',
                        padding: 8,
                        fontWeight: 'bold',
                      }}>
                      Sub Total
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'left',
                        padding: 8,
                        fontWeight: 'bold',
                      }}>
                      {currency} {subTotal}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    borderWidth: 1,
                    marginLeft: '5%',
                    marginRight: '5%',
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#e2e2e2',
                    marginBottom: 5,
                  }}>
                  <View style={{width: '80%'}}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'right',
                        padding: 8,
                        fontWeight: 'bold',
                      }}>
                      Total
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'left',
                        padding: 8,
                        fontWeight: 'bold',
                      }}>
                      {currency} {subTotal}
                    </Text>
                  </View>
                </View>
              </Fragment>
            )}
            <View style={{padding: 15, width: '100%'}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                payment options
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: '5%',
                marginRight: '5%',
                backgroundColor: '#e2e2e2',
                marginBottom: 5,
                backgroundColor: '#e2e2e2',
              }}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Payment Gayway:</Text>
                <View style={{borderWidth: 1, backgroundColor: '#fff'}}>
                  <Picker
                    selectedValue={this.state.paymentGateway}
                    onValueChange={(val) => {
                      this.setState({paymentGateway: val});
                    }}>
                    <Picker.Item label="--Select Payment Gateway--" value="" />
                    {this.props.cart.paymentOptions.length > 0 &&
                      this.props.cart.paymentOptions.map((po, key) => (
                        <Picker.Item
                          label={po.toString()}
                          value={po.toString()}
                          key={key}
                        />
                      ))}
                  </Picker>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: '5%',
                marginRight: '5%',
                backgroundColor: '#e2e2e2',
                marginBottom: 5,
                backgroundColor: '#e2e2e2',
              }}>
              <ButtonComponent
                title="Confirm Order and Pay"
                onPress={() => {
                  this.handleCheckout();
                }}
              />
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
    fontWeight: '400',
    marginBottom: 3,
  },
  formControl: {
    width: '100%',
    padding: 5,
    color: 'black',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapProp = (dispatch) => {
  return {
    myAccount: (unique_id, member_id) =>
      dispatch(myAccount(unique_id, member_id)),
    myCart: (unique_id) => dispatch(myCart(unique_id)),
    cartSummary: (unique_id) => dispatch(cartSummary(unique_id)),
    countryPaymentOpt: () => dispatch(countryPaymentOpt()),
    checkout: (
      unique_id,
      first_name,
      surname,
      phone_number,
      email,
      address_line_1,
      city,
      state,
      postcode,
      country,
      payment_gateway,
      member_id,
      order_total,
      navigation,
    ) =>
      dispatch(
        checkout(
          unique_id,
          first_name,
          surname,
          phone_number,
          email,
          address_line_1,
          city,
          state,
          postcode,
          country,
          payment_gateway,
          member_id,
          order_total,
          navigation,
        ),
      ),
  };
};

export default connect(mapState, mapProp)(CheckoutScreen);

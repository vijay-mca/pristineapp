import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOrderDetails, checkPaymentStatus} from '../redux/action/cartAction';
import {currency} from '../config/const';
import ButtonComponent from './components/ButtonComponent';

class ConfirmOrderScreen extends Component {
  static propTypes = {
    getOrderDetails: PropTypes.func.isRequired,
    checkPaymentStatus: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {};
  }

  componentDidMount() {
    this.isMounted = true;
    try {
      const {params} = this.props.route.params;
      const {order_id} = params;
      this.props.getOrderDetails(this.props.auth.uniqueId, order_id);
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    const {params} = this.props.route.params;
    const {order_id} = params;
    if (this.props.cart.orderStatus === 'order id failed') {
      this.props.checkPaymentStatus(
        this.props.auth.uniqueId,
        this.props.cart.tempOrderId,
        this.props.navigation,
      );
    }
    if (this.props.cart.order.length !== prevProp.cart.order.length) {
      this.props.getOrderDetails(this.props.auth.uniqueId, order_id);
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading, orderDetails, raffleDetails, order} = this.props.cart;

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
      <Fragment>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            scrollEnabled={true}>
            <View style={styles.root}>
              <View style={styles.container}>
                <View style={{width: '100%'}}>
                  <Text style={styles.title}>Order Success</Text>
                  <Text style={styles.p0}>
                    Thank you for participating in Pristine Competitons.
                  </Text>
                  <Text style={styles.p0}>
                    You can also see your Entry number(s) below. You will
                    receive an email to confirm.
                  </Text>
                  <Text style={styles.p0}>
                    You order and payment has been placed successfully. Please
                    find below details of your order.
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1,
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
                      Total Price
                    </Text>
                  </View>
                </View>
                {orderDetails.length > 0 &&
                  orderDetails.map((od, key) => (
                    <Fragment key={key}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: 'rgba(0, 0, 0, 0.3)',
                        }}>
                        <View
                          style={{
                            width: '35%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: od.image, cache: 'force-cache'}}
                            resizeMode="contain"
                            style={{width: '50%', height: 50}}
                          />
                          <Text
                            style={{
                              textAlign: 'center',
                              textAlignVertical: 'center',
                            }}>
                            {od.pro_title}
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
                            {currency} {od.price}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '25%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              textAlignVertical: 'center',
                              backgroundColor: '#D3C499',
                              padding: 5,
                            }}>
                            {od.quantity}
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
                            {currency} {od.total_price}
                          </Text>
                        </View>
                      </View>
                    </Fragment>
                  ))}
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: 6,
                    }}>
                    payment summary
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'flex-start',
                        padding: 5,
                      }}>
                      <Text>Sub Total</Text>
                    </View>
                    <View
                      style={{
                        width: '28%',
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{textAlign: 'right', marginRight: '2%'}}>
                        {currency} {order.grand_total}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'flex-start',
                        padding: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}>
                        Total
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '28%',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          textAlign: 'right',
                          marginRight: '2%',
                          fontWeight: 'bold',
                        }}>
                        {currency} {order.grand_total}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: 6,
                    }}>
                    entry list
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'flex-start',
                        padding: 5,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Competition Name</Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        justifyContent: 'flex-end',
                        padding: 5,
                      }}>
                      <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
                        Entry No
                      </Text>
                    </View>
                  </View>
                  {raffleDetails.length > 0 &&
                    raffleDetails.map((rd, key) => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}
                        key={key}>
                        <View
                          style={{
                            width: '70%',
                            justifyContent: 'flex-start',
                            padding: 5,
                          }}>
                          <Text>{rd.product_title}</Text>
                        </View>
                        <View
                          style={{
                            width: '30%',
                            justifyContent: 'flex-end',
                            padding: 5,
                          }}>
                          <Text style={{textAlign: 'right'}}>
                            {rd.raffle_number}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>

                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: 6,
                    }}>
                    order details
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 6,
                    }}>
                    <View style={{width: '100%'}}>
                      <Text>Order Id : {order.order_id}</Text>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text>Order Date : {order.order_date}</Text>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text>Order Time : {order.order_time}</Text>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text>Payment Type : {order.payment_type}</Text>
                    </View>
                  </View>
                </View>

                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: 6,
                    }}>
                    shipping address
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 6,
                    }}>
                    <View style={{width: '100%'}}>
                      <Text>
                        {order.address_line1}, {order.city}, {order.state}
                      </Text>
                      <Text>{order.country}</Text>
                      <Text>{order.postcode}.</Text>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text>Phone : {order.mobile_no}</Text>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text>Email : {order.email_id}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    marginBottom: 5,
                    marginTop: 5,
                  }}>
                  <ButtonComponent
                    title="Continue"
                    onPress={() => {
                      this.props.navigation.navigate('Listing');
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 6,
    borderBottomWidth: 1,
  },
  p0: {
    marginBottom: 10,
    color: '#000',
    textAlign: 'justify',
  },
});

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapProp = (dispatch) => {
  return {
    checkPaymentStatus: (unique_id, tempOrderId, navigation) =>
      dispatch(checkPaymentStatus(unique_id, tempOrderId, navigation)),
    getOrderDetails: (unique_id, temp_order_id) =>
      dispatch(getOrderDetails(unique_id, temp_order_id)),
  };
};

export default connect(mapState, mapProp)(ConfirmOrderScreen);

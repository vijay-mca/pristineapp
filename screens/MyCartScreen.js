import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  myCart,
  cartSummary,
  modifyQuantity,
  removeCart,
  clearCart,
} from '../redux/action/cartAction';
import {ActivityIndicator} from 'react-native-paper';
import {currency} from '../config/const';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ButtonComponent from './components/ButtonComponent';

class MyCartScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {};
  }

  componentDidMount() {
    this.isMounted = true;
    this.props.myCart(this.props.auth.uniqueId);
    this.props.cartSummary(this.props.auth.uniqueId);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      this.props.cart.totalQty !== prevProp.cart.totalQty &&
      this.props.cart.totalPrice !== prevProp.cart.totalPrice
    ) {
      this.props.myCart(this.props.auth.uniqueId);
      this.props.cartSummary(this.props.auth.uniqueId);
    }
  }

  RemoveCart = (uniqueId, basketID) => {
    Alert.alert(
      'Confirmation',
      'Do you wanto remove this competition?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('canceled');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.removeCart(uniqueId, basketID);
          },
        },
      ],
      {cancelable: true},
    );
  };

  ClearCart = (uniqueId) => {
    Alert.alert(
      'Confirmation',
      'Do you wanto clear basket?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('canceled');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.clearCart(uniqueId);
          },
        },
      ],
      {cancelable: true},
    );
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
              <Text style={styles.title}>my cart</Text>
            </View>
            {myCart.length === 0 && (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'rgba(255,0,0,1)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  No products added to the basket
                </Text>
              </View>
            )}
            {myCart.length > 0 && (
              <View style={styles.body}>
                <View style={{width: '35%', borderRightWidth: 1}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontWeight: 'bold',
                      padding: 10,
                    }}>
                    Item
                  </Text>
                </View>
                <View style={{width: '25%', borderRightWidth: 1}}>
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
                <View style={{width: '20%', borderRightWidth: 1}}>
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
            )}
            {myCart.length > 0 &&
              myCart.map((mc, key) => (
                <Fragment key={key}>
                  <View style={styles.body}>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        borderRightWidth: 1,
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
                      <View
                        style={[
                          {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={() => {
                            this.RemoveCart(
                              this.props.auth.uniqueId,
                              mc.basketID,
                            );
                          }}>
                          <FeatherIcon name="trash" color="#de3535" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.RemoveCart(
                              this.props.auth.uniqueId,
                              mc.basketID,
                            );
                          }}>
                          <Text style={{color: '#de3535'}}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '25%',
                        justifyContent: 'center',
                        borderRightWidth: 1,
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.modifyQuantity(
                              this.props.auth.uniqueId,
                              'dec',
                              mc.basketID,
                              mc.quantity,
                              mc.price,
                            );
                          }}
                          style={{justifyContent: 'center'}}>
                          <FeatherIcon
                            name="minus-circle"
                            color="black"
                            size={24}
                          />
                        </TouchableOpacity>
                        <Text
                          style={[
                            {color: 'black', textAlignVertical: 'center'},
                          ]}>
                          {mc.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.modifyQuantity(
                              this.props.auth.uniqueId,
                              'inc',
                              mc.basketID,
                              mc.quantity,
                              mc.price,
                            );
                          }}
                          style={{justifyContent: 'center'}}>
                          <FeatherIcon
                            name="plus-circle"
                            color="black"
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                        borderRightWidth: 1,
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
                <View style={styles.body}>
                  <View style={{width: '80%', borderRightWidth: 1}}>
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
                <View style={styles.body}>
                  <View style={[{width: '80%', borderRightWidth: 1}]}>
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
                  <View style={[{width: '20%'}]}>
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

                {this.props.auth.authenticate === false ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      padding: 5,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                    }}>
                    <View style={[{width: '60%', alignItems: 'flex-start'}]}>
                      <ButtonComponent
                        title="Continue as Guest"
                        onPress={() => {
                          this.props.navigation.navigate('checkout');
                        }}
                      />
                    </View>
                    <View style={{width: '25%', alignItems: 'center'}}>
                      <ButtonComponent
                        title="Login"
                        onPress={() => {
                          this.props.navigation.navigate('Login');
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.body}>
                    <View style={[{width: '40%'}]}></View>
                    <View
                      style={[
                        {width: '60%', padding: 5, alignItems: 'flex-end'},
                      ]}>
                      <ButtonComponent
                        title="Checkout"
                        onPress={() => {
                          this.props.navigation.navigate('Checkout');
                        }}
                      />
                    </View>
                  </View>
                )}

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: 5,
                    borderBottomWidth: 1,
                  }}>
                  <View style={[{width: '35%'}]}>
                    <ButtonComponent
                      title="Clear Basket"
                      color="black"
                      onPress={() => {
                        this.ClearCart(this.props.auth.uniqueId);
                      }}
                    />
                  </View>
                  <View style={[{width: '45%'}]}>
                    <ButtonComponent
                      title="Continue Shopping"
                      onPress={() => {
                        this.props.navigation.navigate('Listing');
                      }}
                    />
                  </View>
                </View>
              </Fragment>
            )}
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
    flexDirection: 'row',
    borderWidth: 1,
  },
  description: {
    color: 'black',
    fontSize: 14,
  },
});

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapProp = (dispatch) => {
  return {
    myCart: (unique_id) => dispatch(myCart(unique_id)),
    cartSummary: (unique_id) => dispatch(cartSummary(unique_id)),
    modifyQuantity: (unique_id, type, basket_id, current_qty, price) =>
      dispatch(modifyQuantity(unique_id, type, basket_id, current_qty, price)),
    removeCart: (unique_id, basket_id) =>
      dispatch(removeCart(unique_id, basket_id)),
    clearCart: (unique_id) => dispatch(clearCart(unique_id)),
  };
};

export default connect(mapState, mapProp)(MyCartScreen);

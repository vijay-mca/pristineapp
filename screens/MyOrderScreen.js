import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {myOrder} from '../redux/action/cartAction';
import ButtonComponent from './components/ButtonComponent';

class MyOrderScreen extends Component {
  static propTypes = {
    myOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.isMounted = false;

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.props.myOrder(this.props.auth.uniqueId, this.props.auth.memId);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.props.cart.myOrder.length !== prevProp.cart.myOrder.length) {
      this.props.myOrder(this.props.auth.uniqueId, this.props.auth.memId);
    }
  }

  renderMyKeyExtractor = (item, index) => index.toString();

  renderOreder = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', borderWidth: 1}}>
          <View style={{width: '35%', borderRightWidth: 1}}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: 'bold',
                padding: 10,
              }}>
              {item.order_id}
            </Text>
          </View>
          <View style={{width: '35%', borderRightWidth: 1}}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: 'bold',
                padding: 10,
              }}>
              {item.order_date}
            </Text>
          </View>
          <View style={{width: '30%'}}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: 'bold',
                padding: 10,
              }}>
              <ButtonComponent
                title="View"
                onPress={() => {
                  this.props.navigation.navigate('MyOrderDetail', {
                    screen: 'MyOrderDetail',
                    params: {
                      params: {
                        order_id: item.order_id,
                      },
                    },
                  });
                }}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderEmptyOrder = () => {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(255,0,0,1)',
            textAlign: 'center',
            fontWeight: 'bold',
          },
        ]}>
        <Text>No Orders</Text>
      </View>
    );
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {loading, myOrder} = this.props.cart;

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
      <View style={styles.root}>
        <View
          style={{
            padding: 15,
            backgroundColor: '#D3C499',
            color: 'white',
            width: '100%',
          }}>
          <Text style={styles.title}>My Order</Text>
        </View>
        <View style={[styles.container, {marginTop: '1%'}]}>
          <View style={{flexDirection: 'row', borderWidth: 1}}>
            <View style={{width: '35%', borderRightWidth: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                Order ID
              </Text>
            </View>
            <View style={{width: '35%', borderRightWidth: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                Date
              </Text>
            </View>
            <View style={{width: '30%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                Action
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={myOrder}
          renderItem={this.renderOreder}
          ListEmptyComponent={this.renderEmptyOrder}
          keyExtractor={this.renderMyKeyExtractor}
        />
      </View>
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
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myOrder: (uniqueId, memberId) => {
      dispatch(myOrder(uniqueId, memberId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderScreen);

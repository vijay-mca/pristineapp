import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {cartRefresh} from '../../redux/action/cartAction';

class CartIcon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.cartRefresh(this.props.auth.uniqueId);
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      this.props.cart.totalQty !== prevProp.cart.totalQty &&
      this.props.cart.totalPrice !== prevProp.cart.totalPrice
    ) {
      this.props.cartRefresh(this.props.auth.uniqueId);
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {cart} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MyCart');
        }}>
        <View
          style={[
            {padding: 5},
            Platform.OS === 'android' ? styles.iconContainer : null,
          ]}>
          <View
            style={{
              position: 'absolute',
              height: 20,
              width: 20,
              borderRadius: 15,
              backgroundColor: 'red',
              right: 15,
              bottom: 30,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {cart.totalQty}
            </Text>
          </View>
          <Icon.Button
            name="shopping-cart"
            size={30}
            backgroundColor="black"
            color="#D3C499"
            onPress={() => {
              this.props.navigation.navigate('MyCart');
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5,
  },
});

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapProp = (dispatch) => {
  return {
    cartRefresh: (unique_id) => dispatch(cartRefresh(unique_id)),
  };
};

export default connect(mapState, mapProp)(CartIcon);

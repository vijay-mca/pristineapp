import {
  CART_REFRESH,
  LOADING,
  MY_CART,
  CART_SUMMARY,
  MODIFY_QUANTITY,
  COUNTRY_PAYMENT_OPTIONS,
  CHECKOUT,
  CHECK_PAYMENT_STATUS,
  GET_ORDER_DETAILS,
  MY_ORDER,
  CLEAR_CART,
} from '../types';
import {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  API,
  REQUEST_HEADER,
} from '../../config/const';
import {Alert} from 'react-native';

export function cartRefresh(unique_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CartRefresh',
        unique_id: unique_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      dispatch({
        type: CART_REFRESH,
        payload: {
          total_price: res.total_price,
          total_quantity: res.total_quantity,
        },
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function addCart(
  member_id,
  unique_id,
  product_id,
  product_price,
  qty,
  question_answer,
) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'AddToCart',
        unique_id: unique_id,
        member_id: member_id,
        product_id: product_id,
        product_price: product_price,
        qty: qty,
        question_answer: question_answer,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch(cartRefresh(unique_id));
      } else if (res.status === 'exist') {
        Alert.alert(
          'Status',
          'You already added this competiton in your cart.',
          [{text: 'Ok'}],
          {
            cancelable: true,
          },
        );
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function myCart(unique_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'Cart',
        unique_id: unique_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      dispatch({
        type: MY_CART,
        payload: res.result,
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function cartSummary(unique_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CartSummary',
        unique_id: unique_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();
      dispatch({
        type: CART_SUMMARY,
        payload: {
          sub_total: res.sub_total.subtotal,
          order_total: res.ordertotal,
          paymentGatewayFile: res.PaymentGatewayFile,
          paymentGatewayFolder: res.PaymentGatewayFolder,
        },
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function modifyQuantity(unique_id, type, basket_id, current_qty, price) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'ModifyQuantity',
        unique_id: unique_id,
        type: type,
        basket_id: basket_id,
        current_qty: current_qty,
        price: price,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.new_qty === 0) {
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
                dispatch(removeBasket(unique_id, basket_id));
              },
            },
          ],
          {cancelable: true},
        );
      } else {
        dispatch({
          type: MODIFY_QUANTITY,
          payload: {new_qty: res.new_qty, new_total_price: res.new_total_price},
        });
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function removeCart(unique_id, basket_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'RemoveBasket',
        unique_id: unique_id,
        basket_id: basket_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      dispatch(cartRefresh(unique_id));
      dispatch(myCart(unique_id));
      dispatch(cartSummary(unique_id));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function clearCart(unique_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'clearBasket',
        unique_id: unique_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch({
          type: CLEAR_CART,
        });

        dispatch(cartRefresh(unique_id));
        dispatch(myCart(unique_id));
        dispatch(cartSummary(unique_id));
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function countryPaymentOpt() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CountryAndPaymentOptions',
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      dispatch({
        type: COUNTRY_PAYMENT_OPTIONS,
        payload: res,
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function checkout(
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
) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CheckoutOrder',
        unique_id: unique_id,
        first_name: first_name,
        surname: surname,
        phone_number: phone_number,
        email: email,
        address_line_1: address_line_1,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        payment_gateway: payment_gateway,
        member_id: member_id,
        order_total: order_total,
        app_version: '0.0.0',
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch({
          type: CHECKOUT,
          payload: res,
        });

        navigation.navigate('Cashflow');
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function checkPaymentStatus(unique_id, temp_order_id, navigation) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        action: 'CheckPaymentStatus',
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        unique_id: unique_id,
        temp_order_id: temp_order_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch(cartRefresh(unique_id));
        dispatch({
          type: CHECK_PAYMENT_STATUS,
          payload: res,
        });
        navigation.navigate('ConfirmOrder', {
          screen: 'ConfirmOrder',
          params: {
            params: {
              order_id: res.order_id,
            },
          },
        });
      } else if (res.status === 'failed') {
        Alert.alert(
          'Error',
          `Payment Failed. If you wish you can retry. ${res.payment_error}`,
          [{text: 'Ok'}],
          {
            cancelable: true,
          },
        );

        navigation.navigate('Checkout');
      } else if (res.status === 'order id failed') {
        dispatch(checkPaymentStatus(unique_id, temp_order_id, navigation));
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function getOrderDetails(unique_id, orderId) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        action: 'GetOrderDetails',
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        unique_id: unique_id,
        OrderId: orderId,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      dispatch({
        type: GET_ORDER_DETAILS,
        payload: res,
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function myOrder(unique_id, member_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        action: 'MyOrder',
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        unique_id: unique_id,
        member_id: member_id,
      };

      let formBody = [];

      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');

      const req = await fetch(API, {
        method: 'POST',
        headers: REQUEST_HEADER,
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch({
          type: MY_ORDER,
          payload: res.Orders,
        });
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function setLoading(option) {
  return {
    type: LOADING,
    payload: option,
  };
}

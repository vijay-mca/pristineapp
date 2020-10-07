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

const initialState = {
  totalPrice: 0.0,
  totalQty: 0,
  myCart: [],
  subTotal: 0,
  orderTotal: 0,
  countryOptions: [],
  paymentGatewayFolder: '',
  paymentGatewayFile: '',
  paymentOptions: [],
  paymentDft: '',
  tempOrderId: '',
  orderStatus: '',
  orderId: '',
  order: [],
  orderDetails: [],
  raffleDetails: [],
  myOrder: [],
  loading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CART_REFRESH:
      return {
        ...state,
        totalPrice: payload.total_price,
        totalQty: payload.total_quantity,
      };

    case MY_CART:
      return {
        ...state,
        myCart: payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        totalPrice: 0.0,
        totalQty: 0,
        myCart: [],
        subTotal: 0,
        orderTotal: 0,
      };

    case CART_SUMMARY:
      return {
        ...state,
        subTotal: payload.sub_total,
        orderTotal: payload.order_total,
        paymentGatewayFolder: payload.paymentGatewayFolder,
        paymentGatewayFile: payload.paymentGatewayFile,
      };

    case MODIFY_QUANTITY:
      return {
        ...state,
        totalPrice: payload.new_total_price,
        totalQty: payload.new_total_qty,
      };

    case COUNTRY_PAYMENT_OPTIONS:
      return {
        ...state,
        countryOptions: payload.country_options,
        paymentOptions: payload.payment_options,
        paymentDft: payload.default_selected_payment_option,
      };

    case CHECKOUT:
      return {
        ...state,
        tempOrderId: payload.temp_order_id,
      };

    case CHECK_PAYMENT_STATUS:
      return {
        ...state,
        orderStatus: payload.status,
        orderId: payload.order_id,
      };

    case GET_ORDER_DETAILS:
      return {
        ...state,
        order: payload.order,
        orderDetails: payload.order_details,
        raffleDetails: payload.raffle_details,
      };

    case MY_ORDER:
      return {
        ...state,
        myOrder: payload,
      };

    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};

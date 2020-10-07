import React, {Component, Fragment, createRef} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import {getOrderDetails, checkPaymentStatus} from '../redux/action/cartAction';

class CashflowScreen extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      webview: createRef(),
      url: '',
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.setState({
      url: `https://www.pristinecompetitions.com/demo/${this.props.cart.paymentGatewayFolder}${this.props.cart.paymentGatewayFile}?temp_order_id=${this.props.cart.tempOrderId}`,
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.props.cart.tempOrderId != prevProp.cart.tempOrderId) {
      this.setState({
        url: `https://www.pristinecompetitions.com/demo/${this.props.cart.paymentGatewayFolder}${this.props.cart.paymentGatewayFile}?temp_order_id=${this.props.cart.tempOrderId}`,
      });
    }
  }

  renderLoadingView() {
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

  onNavigationStateChange = (event) => {
    try {
      let url = event.url.split('/');
      let pageWithParam = url[4];
      if (pageWithParam !== undefined) {
        let page = pageWithParam.split('?');
        if (page !== undefined) {
          let pageName = page[0];
          if (page[1] !== undefined) {
            let params = page[1].split('&');
            if (params[2] !== undefined) {
              let tempOrderId = params[2].split('=');

              if (pageName === 'int-cashflow_return_failed.php') {
                Alert.alert(
                  'Error',
                  'Payment Failed. if you wish you can retry.',
                  [{text: 'Ok'}],
                  {
                    cancelable: true,
                  },
                );
                this.props.navigation.navigate('Checkout');
              }
              if (pageName === 'int-cashflow_return_cancelled.php') {
                Alert.alert(
                  'Error',
                  'Payment Failed. if you wish you can retry.',
                  [{text: 'Ok'}],
                  {
                    cancelable: true,
                  },
                );
                this.props.navigation.navigate('Checkout');
              }
              if (pageName === 'int-cashflow_return_success.php') {
                this.props.checkPaymentStatus(
                  this.props.auth.uniqueId,
                  tempOrderId[1],
                  this.props.navigation,
                );
              }
            }
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };

  shouldComponentUpdate(prevProp, prevState) {
    //console.log(this.props.cart.tempOrderId, prevProp.cart.tempOrderId);
    return true;
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', marginTop: 20}}>
        <WebView
          source={{
            uri: this.state.url,
          }}
          ref={this.state.webview}
          renderLoading={this.renderLoadingView}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            this.onNavigationStateChange(navState);
          }}
        />
      </View>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapProp = (dispatch) => {
  return {
    checkPaymentStatus: (unique_id, temp_order_id, navigation) =>
      dispatch(checkPaymentStatus(unique_id, temp_order_id, navigation)),
  };
};

export default connect(mapState, mapProp)(CashflowScreen);

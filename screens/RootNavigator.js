import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import DrawerNavigator from './DrawerNavigator';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  checkAuth,
  generateUniqueId,
  getUniqueId,
} from '../redux/action/authAction';
class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      memberId: '',
    };
  }

  componentDidMount() {
    this.isMounted = false;
    this.getAuthToken();
    this.generateId();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  getAuthToken = async () => {
    try {
      const memId = await AsyncStorage.getItem('@memId');
      this.setState({memberId: memId});
      if (memId === null) {
        this.props.checkAuth('');
      } else {
        this.props.checkAuth(memId);
      }
    } catch (error) {
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: false,
      });
    }
  };

  generateId = async () => {
    try {
      const getUniqueID = await AsyncStorage.getItem('@uniqueId');

      if (getUniqueID === null) {
        this.props.generateUniqueId();
      } else {
        this.props.getUniqueId(getUniqueID);
      }
    } catch (error) {
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: false,
      });
    }
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.auth.authenticate !== this.props.auth.authenticate) {
      this.getAuthToken();
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState, {checkAuth, generateUniqueId, getUniqueId})(
  RootNavigator,
);

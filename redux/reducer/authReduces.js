import {
  AUTHENTICATION,
  LOADING,
  CHECK_AUTH,
  UNIQUE_ID,
  GET_UNIQUE_ID,
  REGISTER,
  MY_ACCOUNT,
  LOGOUT,
} from '../types';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
const initialState = {
  authenticate: false,
  loading: false,
  memId: '',
  uniqueId: null,
  memberDetails: [],
  countryOptions: [],
};
async function setAuthToken(token) {
  try {
    await AsyncStorage.setItem('@memId', token);
  } catch (error) {
    Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
      cancelable: false,
    });
  }
}

async function removeAuthToken(token) {
  try {
    await AsyncStorage.removeItem('@memId', token);
  } catch (error) {
    Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
      cancelable: false,
    });
  }
}

async function setUniqueId(unique_id) {
  try {
    await AsyncStorage.setItem('@uniqueId', unique_id);
  } catch (error) {
    Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
      cancelable: false,
    });
  }
}

const removeUniqueId = async () => {
  try {
    await AsyncStorage.removeItem('@uniqueId');
  } catch (error) {
    Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
      cancelable: false,
    });
  }
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTHENTICATION:
      setAuthToken(payload);
      return {
        ...state,
        authenticate: true,
      };
    case REGISTER:
      setAuthToken(payload);
      return {
        ...state,
        authenticate: true,
      };
    case CHECK_AUTH:
      return {
        ...state,
        memId: payload === '' ? '' : payload,
        authenticate: payload === '' ? false : true,
      };
    case UNIQUE_ID:
      setUniqueId(payload);
      return {
        ...state,
        uniqueId: payload,
      };

    case GET_UNIQUE_ID:
      return {
        ...state,
        uniqueId: payload,
      };

    case MY_ACCOUNT:
      return {
        ...state,
        memberDetails: payload.member_details,
        countryOptions: payload.country_options,
      };

    case LOGOUT:
      removeAuthToken();
      return {
        ...state,
        memId: '',
        authenticate: false,
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

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
import {API, AUTH_USERNAME, AUTH_PASSWORD} from '../../config/const';
import {Alert, Platform} from 'react-native';

export function generateUniqueId() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'GenerateUniqueId',
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const {unique_id} = await req.json();

      dispatch({
        type: UNIQUE_ID,
        payload: unique_id,
      });

      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
}

export function getUniqueId(id) {
  return async (dispatch) => {
    dispatch({
      type: GET_UNIQUE_ID,
      payload: id,
    });
  };
}

export function authenticate(email, password, navigation) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'Login',
        Email: email,
        password: password,
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const res = await req.json();
      if (res.status === 'success') {
        dispatch({
          type: AUTHENTICATION,
          payload: res.mem_id,
        });
        navigation.navigate('Listing');
      } else if (res.status === 'Invalid login details') {
        Alert.alert(
          'Authentication',
          'Invalid Email or Password',
          [{text: 'Ok'}],
          {
            cancelable: true,
          },
        );
      } else if (res.status === 'Invalid password') {
        Alert.alert('Authentication', 'Invalid Password', [{text: 'Ok'}], {
          cancelable: true,
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

export function register(name, contact, email, password, type, navigation) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'Register',
        Name: name,
        EmailId: email,
        PhoneNo: contact,
        password: password,
        type: type,
        gcmid: 123456,
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch({
          type: REGISTER,
          payload: res.mem_id,
        });

        Alert.alert(
          'Authentication',
          'Successfully registered you can access our service',
          [{text: 'Ok'}],
          {cancelable: true},
        );

        navigation.navigate('Listing');

        dispatch(setLoading(false));
      } else if (res.status === 'email exist') {
        Alert.alert('Authentication', 'Email already exist', [{text: 'Ok'}], {
          cancelable: true,
        });

        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));

      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });

      dispatch(setLoading(false));
    }
  };
}

export function checkAuth(token) {
  return async (dispatch) => {
    dispatch({
      type: CHECK_AUTH,
      payload: token,
    });
  };
}

export function myAccount(unique_id, member_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'MyAccount',
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const res = await req.json();

      if (res.MemberDetails !== false) {
        dispatch({
          type: MY_ACCOUNT,
          payload: {
            member_details: res.MemberDetails,
            country_options: res.country_options,
          },
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });

      dispatch(setLoading(false));
    }
  };
}

export function updateAccount(
  memId,
  firstName,
  surName,
  phoneNumber,
  addressLine1,
  city,
  state,
  postCode,
  country,
) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'UpdateAccount',
        member_id: memId,
        mem_name: firstName,
        mem_lname: surName,
        mobile_no: phoneNumber,
        address_line1: addressLine1,
        city: city,
        state: state,
        postcode: postCode,
        country: country,
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const res = await req.json();

      if (res.status === 'success') {
        dispatch(myAccount(memId));

        Alert.alert(
          'Status',
          'Successfully updated your account',
          [{text: 'Ok'}],
          {cancelable: true},
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

export function changePassword(oldPass, newPass, mem_id, uniqueId) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'ChangePassword',
        new_password: newPass,
        member_id: mem_id,
      };

      let formBody = [];
      for (let property in post) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(post[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      const result = await res.json();

      if (result.status === 'success') {
        Alert.alert('Status', 'Successfully password updated', [{text: 'Ok'}], {
          cancelable: true,
        });
        dispatch(myAccount(uniqueId, mem_id));
      } else if (result.status === 'same_password') {
        Alert.alert(
          'Status',
          'Old password same as new password try different',
          [{text: 'Ok'}],
          {
            cancelable: true,
          },
        );
      } else if (result.status === 'password_mismatch') {
        Alert.alert(
          'Status',
          'Old password not matched with current password try correct one',
          [{text: 'Ok'}],
          {
            cancelable: true,
          },
        );
      }
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      Alert.alert('Status', err.message, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch({type: LOGOUT});
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

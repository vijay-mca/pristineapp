import {Alert} from 'react-native';
import {
  API,
  REQUEST_HEADER,
  AUTH_USERNAME,
  AUTH_PASSWORD,
} from '../../config/const';
import {LOADING, CMS_CONTENT, WINNER_GALLERY} from '../types';

export function cmsContent(cms_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CMS_Content',
        cms_id: cms_id,
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
        type: CMS_CONTENT,
        payload: res,
      });

      dispatch(setLoading(false));
    } catch (error) {
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
}

export function showWinnerGallery(unique_id, start, end) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'ShowWinnersGallery',
        unique_id: unique_id,
        limit_start: start,
        limit_end: end,
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
        type: WINNER_GALLERY,
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

export const contact = (
  unique_id,
  member_id,
  first_name,
  last_name,
  phone_number,
  email,
  message,
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'ContactForm',
        unique_id: unique_id,
        member_id: member_id,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email,
        message: message,
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

      const res = await req.text();
      
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Error', `${error.message}`, [{text: 'Ok'}], {
        cancelable: true,
      });
    }
  };
};

export function setLoading(option) {
  return {
    type: LOADING,
    payload: option,
  };
}

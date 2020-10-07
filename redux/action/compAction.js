import {Alert} from 'react-native';
import {
  API,
  REQUEST_HEADER,
  AUTH_USERNAME,
  AUTH_PASSWORD,
} from '../../config/const';
import {LOADING, COMPETITION_DETAILS, COMPETITION_LIST} from '../types';

export function competitionList() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CompetitionsList',
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
        type: COMPETITION_LIST,
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

export function competitionDetails(comp_id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        auth_username: AUTH_USERNAME,
        auth_password: AUTH_PASSWORD,
        action: 'CompetitionsDetails',
        comp_id: comp_id,
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
        type: COMPETITION_DETAILS,
        payload: {result: res.result, question: res.questionandanswer},
      });

      dispatch(setLoading(false));
    } catch (error) {
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

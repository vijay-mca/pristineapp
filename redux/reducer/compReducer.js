import {COMPETITION_DETAILS, LOADING, COMPETITION_LIST} from '../types';

const initialState = {
  loading: false,
  listing: [],
  details: [],
  question: [],
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case COMPETITION_LIST:
      return {
        ...state,
        listing: payload,
      };
    case COMPETITION_DETAILS:
      return {
        ...state,
        details: payload.result,
        question: payload.question !== undefined ? payload.question : [],
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

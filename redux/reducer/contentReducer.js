import {CMS_CONTENT, LOADING, WINNER_GALLERY} from '../types';

const initialState = {
  loading: false,
  content: null,
  winnerGallery: [],
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CMS_CONTENT:
      return {
        ...state,
        content: payload,
      };

    case WINNER_GALLERY:
      return {
        ...state,
        winnerGallery: payload.gallery,
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

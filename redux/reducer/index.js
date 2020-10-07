import {combineReducers} from 'redux';

import authReducer from './authReduces';
import contentReducer from './contentReducer';
import compReducer from './compReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cms: contentReducer,
  comp: compReducer,
  cart: cartReducer,
});

export default rootReducer;

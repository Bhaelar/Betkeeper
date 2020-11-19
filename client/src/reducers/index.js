import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import bet from './bet';

export default combineReducers({
  auth,
  alert,
  bet
});

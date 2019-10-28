import { combineReducers } from 'redux';
import auth from './auth';
import game from './game';

const AppReducer = combineReducers({
  auth,
  game,
});

export default AppReducer;

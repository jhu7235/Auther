import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import auth from './login';

export default combineReducers({ users, stories, auth });

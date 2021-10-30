import { combineReducers } from "redux";
import isLoggedIn from './reducers/loginStateGoogle'

export default combineReducers({
    isLoggedIn,
});
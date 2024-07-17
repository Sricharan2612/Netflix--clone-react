import { combineReducers } from "redux";
import userReducer from './userReducer';
import movieReducer from "./movieReducer";

const rootReducer = combineReducers({
    user: userReducer,
    movie: movieReducer
});

export default rootReducer;
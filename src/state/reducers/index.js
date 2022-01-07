import { combineReducers } from "redux";
import currentLoginStatusReducer from "./currentLoginStatusReducer";
import currentPathReducer from "./currentPathReducer";
import currentUserReducer from "./currentUserReducer";
import currentCartReducer from "./currentCartReducer";

const reducers = combineReducers({
    currentPath: currentPathReducer,
    currentLoginStatus: currentLoginStatusReducer,
    currentUser: currentUserReducer,
    currentCart: currentCartReducer
});

export default reducers;

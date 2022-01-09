import { combineReducers } from "redux";
import currentLoginStatusReducer from "./currentLoginStatusReducer";
import currentPathReducer from "./currentPathReducer";
import currentUserReducer from "./currentUserReducer";
import currentCartReducer from "./currentCartReducer";
import currentSearchKeywordReducer from "./currentSearchKeywordReducer";
import currentTableNumberReducer from "./currentTableNumberReducer";

const reducers = combineReducers({
    currentPath: currentPathReducer,
    currentLoginStatus: currentLoginStatusReducer,
    currentUser: currentUserReducer,
    currentCart: currentCartReducer,
    currentSearchKeyword: currentSearchKeywordReducer,
    currentTableNumber: currentTableNumberReducer,
});

export default reducers;

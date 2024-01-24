import { combineReducers } from "redux";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;

//componente che raggruppa al suo interno tutti i reducer e che verrà passato allo store

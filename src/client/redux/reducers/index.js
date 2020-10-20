import { combineReducers } from "redux";

// reducers
import userReducer from "./user.reducer";
import notificationReducer from "./notification.reducer";
import listReducer from "./list.reducer";

export default combineReducers({
  userData: userReducer,
  notification: notificationReducer,
  list: listReducer,
});

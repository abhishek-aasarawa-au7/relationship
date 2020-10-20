import { combineReducers } from "redux";

// reducers
import userReducer from "./user.reducer";
import notificationReducer from "./notification.reducer";

export default combineReducers({
  userData: userReducer,
  notification: notificationReducer,
});

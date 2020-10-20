import { UPDATE_INDEX, RESET_INDEX } from "../actions/list.action";

let initState = -1;

const reducer = (state = initState, action) => {
  if (action.type === UPDATE_INDEX) {
    return action.payload;
  }
  if (action.type === RESET_INDEX) {
    return initState;
  }
  return state;
};

export default reducer;

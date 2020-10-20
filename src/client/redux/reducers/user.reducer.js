import { SET_DATA } from "../actions/user.actions";

let initState = {
  name: "",
  list: [],
  relation: [],
};

const reducer = (state = initState, action) => {
  if (action.type === SET_DATA) {
    return { ...action.payload };
  }
  return state;
};

export default reducer;

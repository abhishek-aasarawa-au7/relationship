import { SET_DATA, UPDATE_DATA } from "../actions/user.actions";

let initState = {
  name: "",
  list: [],
  relations: [],
};

const reducer = (state = initState, action) => {
  if (action.type === SET_DATA) {
    return { ...action.payload };
  }

  if (action.type === UPDATE_DATA) {
    let relations = [...state.relations];
    relations.splice(action.payload.index, 1, action.payload.relation);

    return { ...state, relations };
  }
  return state;
};

export default reducer;

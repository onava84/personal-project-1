const initialState = {
  userId: 0,
  username: "",
};

const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const CLEAR_REDUX_STATE = "CLEAR_REDUX_STORE";

export const updateUsername = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export const updateUserId = (userid) => {
  return {
    type: UPDATE_USER_ID,
    payload: userid,
  };
};

export const clearReduxState = () => {
  return {
    type: CLEAR_REDUX_STATE,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    case UPDATE_USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case CLEAR_REDUX_STATE: {
      return {
        ...state,
        userId: 0,
        username: "",
      };
    }
    default:
      return state;
  }
};

export default reducer;

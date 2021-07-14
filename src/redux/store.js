import { createStore, combineReducers } from "redux";
import reducer from "./reducer";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducerTwo from "./reducerTwo";

const store = createStore(reducer, composeWithDevTools(applyMiddleware())); // ---> esto cuando solo es un reducer

// const rootReducer = combineReducers({
//   reducer,
// });

// export default createStore(reducer); //con un reducer
export default store;

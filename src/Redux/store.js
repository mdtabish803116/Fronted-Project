import {legacy_createStore as createStore , combineReducers , applyMiddleware} from "redux";
import {registerReducer} from "./Register/reducer";
import {loginReducer} from "./Login/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
      registerUser : registerReducer,
      loginUser : loginReducer

})


export const store = createStore(rootReducer , applyMiddleware(thunk))

store.subscribe(() => {
    console.log(store.getState());
  })
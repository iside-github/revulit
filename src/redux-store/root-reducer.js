import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import fileUploadReducer from "./file/upload";
import userReducer from "./user/user.slice";
import systemUsersReducer from "./users/user.slice";

import authReducer from "./user/auth.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],    
};

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  file: fileUploadReducer,
  user: userReducer,
  users: systemUsersReducer,
});

export default persistReducer(persistConfig, rootReducer);

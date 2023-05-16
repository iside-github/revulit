import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import { reducer as calendarReducer } from "slices/calendar";
import { reducer as chatReducer } from "slices/chat";
import { reducer as kanbanReducer } from "slices/kanban";
import { reducer as mailReducer } from "slices/mail";
import fileUploadReducer from "./file/upload";

import authReducer from "./user/auth.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  form: formReducer,
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  auth: authReducer,
  file: fileUploadReducer,
});

export default persistReducer(persistConfig, rootReducer);

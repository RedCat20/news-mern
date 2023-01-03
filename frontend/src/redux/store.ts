import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice";
import {articlesReducer} from "./slices/articlesSlice";
import {postsApi} from "./api/postsApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        articles: articlesReducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
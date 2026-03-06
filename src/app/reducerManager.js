import { combineReducers } from "@reduxjs/toolkit";
import authRootReducer from "../features/Auth/Redux/authRootReducers";

export function createReducerManager(initialReducers) {
    const reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);

    return {
        getReducerMap: () => reducers,
        reduce: (state, action) => combinedReducer(state, action),
        add: (key, reducer) => {
            if (!key || reducers[key]) return;
            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key) => {
            if (!key || !reducers[key]) return;
            delete reducers[key];
            combinedReducer = combineReducers(reducers);
        },
    };
}

export const staticReducers = {
    auth: authRootReducer,
};

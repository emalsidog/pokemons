// Dependencies
import { all } from "redux-saga/effects";

// Watchers
import { userUpdateWatcher } from "./user-update-saga";

export function* rootWatcher() {
    yield all([userUpdateWatcher()]);
}
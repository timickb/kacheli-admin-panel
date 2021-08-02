"use strict";
exports.__esModule = true;
exports.activityReducer = exports.initialState = void 0;
var constants_1 = require("../constants");
exports.initialState = {
    activities: [],
    loading: false,
    error: null
};
var activityReducer = function (state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case constants_1.FETCH_ACTIVITIES:
            return { loading: true, error: null, activities: [] };
        default:
            return state;
    }
};
exports.activityReducer = activityReducer;

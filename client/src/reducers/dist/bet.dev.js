"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  bets: [],
  bet: null,
  loading: true,
  error: {}
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _types.GET_BETS:
      return _objectSpread({}, state, {
        bets: payload,
        loading: false
      });
    // case GET_POST:
    // 	return {
    // 		...state,
    // 		post: payload,
    // 		loading: false
    // 	};
    // case ADD_POST:
    // 	return {
    // 		...state,
    // 		posts: [ payload, ...state.posts ],
    // 		loading: false
    // 	};
    // case DELETE_POST:
    // 	return {
    // 		...state,
    // 		posts: state.posts.filter((post) => post._id !== payload),
    // 		loading: false
    // 	};

    case _types.BET_ERROR:
      return _objectSpread({}, state, {
        error: payload,
        loading: false
      });
    // case UPDATE_LIKES:
    // 	return {
    // 		...state,
    // 		posts: state.posts.map((post) => (post._id === payload.id ? { ...post, likes: payload.likes } : post)),
    // 		loading: false
    // 	};
    // case ADD_COMMENT:
    // 	return {
    // 		...state,
    // 		post: { ...state.post, comments: payload },
    // 		loading: false
    // 	};
    // case UPDATE_COMMENT_LIKES:
    // 	return {
    // 		...state,
    // 		post: {
    // 			...state.post,
    // 			comments: state.post.comments.map(
    // 				(comment) =>
    // 					comment._id === payload.comment_id ? { ...comment, likes: payload.likes } : comment
    // 			)
    // 		},
    // 		loading: false
    // 	};
    // case REMOVE_COMMENT:
    // 	return {
    // 		...state,
    // 		post: {
    // 			...state.post,
    // 			comments: state.post.comments.filter((comment) => comment._id !== payload)
    // 		},
    // 		loading: false
    // 	};

    default:
      return state;
  }
}
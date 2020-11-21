import {
	GET_BETS,
	ADD_BET,
	GET_BET,
	UPDATE_STATUS,
	BET_ERROR
} from '../actions/types';

const initialState = {
	bets: [],
	bet: null,
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_BETS:
			return {
				...state,
				bets: payload,
				loading: false
			};
		case GET_BET:
			return {
				...state,
				bet: payload,
				loading: false
			};
		case ADD_BET:
		return {
				...state,
				bets: [ payload, ...state.bets ],
				loading: false
			};
		case UPDATE_STATUS:
			return {
				...state,
		        bets: state.bets.map(bet =>
		          bet.id === payload.id ? { ...bet, status: payload.status, profit: payload.profit } : bet
		        ),
		        loading: false
			}
		// case DELETE_POST:
		// 	return {
		// 		...state,
		// 		posts: state.posts.filter((post) => post._id !== payload),
		// 		loading: false
		// 	};
		case BET_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
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

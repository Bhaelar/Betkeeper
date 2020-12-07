import api from '../utils/api';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_UPDATED } from './types';

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get('/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register User
export const register = (formData, history) => async (dispatch) => {
  try {
		const res = await api.post('/users', formData);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
        });
        history.push('/login');
		// dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Update user info
export const updateUser = ({country, fav_team, image}) => async (dispatch) => {
	try {
		const body = JSON.stringify({country, fav_team, image});
		const res = await api.put('/users/update', body);

		dispatch({
			type: USER_UPDATED,
			payload: res.data
		});
		dispatch(setAlert('Profile updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
}

// Login User
export const login = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/auth', formData);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

        dispatch(loadUser());
    } catch (err) {
		const errors = err.response.data.errors;
        console.log(errors);
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Logout
export const logout = () => ({
	type: LOGOUT
});

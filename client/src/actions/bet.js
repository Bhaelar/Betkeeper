import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_BETS,
    ADD_BET,
    BET_ERROR
} from './types';

// Get posts
export const getBets = () => async dispatch => {
  try {
    const res = await api.get('/bets');
    console.log(res.data);
    dispatch({
      type: GET_BETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// // Add post
export const addBet = ({ sport, country, competition, fixture, market, bet, stake, odds, status, locked, profit }, history) => async dispatch => {
  const body = JSON.stringify({ sport, country, competition, fixture, market, bet, stake, odds, status, locked, profit });
  try {
    const res = await api.post('/bets', body);

    dispatch({
      type: ADD_BET,
      payload: res.data
    });
    history.push('/');
    dispatch(setAlert('Bet Created', 'success'));
  } catch (err) {
    dispatch({
      type: BET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

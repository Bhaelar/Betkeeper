import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_BETS,
    GET_BET,
    ADD_BET,
    UPDATE_STATUS,
    BET_ERROR
} from './types';

// Get posts
export const getBets = () => async dispatch => {
  try {
    const res = await api.get('/bets');
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


// // Add bet
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

// Get Bet
export const getBet = id => async dispatch => {
  try {
    const res = await api.get(`/bets/${id}`);
    dispatch({
      type: GET_BET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update bet
export const updateBet = ({ sport, country, competition, fixture, market, bet, stake, odds, status, locked }, id) => async dispatch => {
  const body = JSON.stringify({ sport, country, competition, fixture, market, bet, stake, odds, status, locked });
  try {
    const res = await api.put(`/bets/${id}`, body);
    dispatch({
      type: UPDATE_STATUS,
      payload: { id, status: res.data.status, profit: res.data.profit }
    });    
    dispatch(setAlert('Bet Updated', 'success'));
  } catch (err) {
    dispatch({
      type: BET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

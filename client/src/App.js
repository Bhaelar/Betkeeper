import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';

import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';

function App () {
	useEffect(() => {
	    // check for token in LS
	    if (localStorage.token) {
	      setAuthToken(localStorage.token);
	    }
	    store.dispatch(loadUser());

	    // log user out from all tabs if they log out in one tab
	    window.addEventListener('storage', () => {
	      if (!localStorage.token) store.dispatch({ type: LOGOUT });
	    });
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Route component={Routes} />
			</Router>
		</Provider>
	);
}

export default App;

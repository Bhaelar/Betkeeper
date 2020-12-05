import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../layouts/Home';
import AddBet from '../bets/AddBet';
import BetList from '../bets/BetList';
import ViewBet from '../bets/ViewBet';
import Profile from '../layouts/Profile';
import Comingsoon from '../layouts/Comingsoon';
import PrivateRoute from './PrivateRoutes';

const Routes = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<DefaultLayout>
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute exact path="/add" component={AddBet} />
					<PrivateRoute exact path="/history" component={BetList} />
					<PrivateRoute exact path="/view" component={ViewBet} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute exact path="/feed" component={Comingsoon} />
					<PrivateRoute exact path="/tipsters" component={Comingsoon} />
					<PrivateRoute exact path="/contests" component={Comingsoon} />
				</DefaultLayout>
			</Switch>
		</div>
	);
};

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../Alert';
import Home from '../Home';
import AddBet from '../bets/AddBet';
import PrivateRoute from './PrivateRoutes';

const Routes = () => {
  return (
    <div>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/add" component={AddBet} />
      </Switch>
    </div>
  );
};

export default Routes;

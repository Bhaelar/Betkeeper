import React, {useRef} from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import AlertMsg from '../Alert';
import Home from '../Home';
import AddBet from '../bets/AddBet';
import BetList from '../bets/BetList';
import PrivateRoute from './PrivateRoutes';

import {Container} from 'reactstrap';

const Routes = () => {
  const inputRef = useRef('mainContent');
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/add" component={AddBet} />
        <PrivateRoute exact path="/history" component={BetList} />
      </Switch>
    </div>
  );
};

export default Routes;

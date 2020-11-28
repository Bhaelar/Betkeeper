/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Home from './Home.js';
import Register from './auth/Register.js';
import Login from './auth/Login.js';
import AddBet from './bets/AddBet';
import BetList from './bets/BetList';

var routes = [
	{
		path: '/',
		name: 'Dashboard',
		icon: 'ni ni-tv-2 text-primary',
		component: Home,
		layout: '/'
	},
	{
		path: '/add',
		name: 'Add Bet',
		icon: 'fas fa-plus text-green',
		component: AddBet,
		layout: '/add'
	},
	{
		path: '/history',
		name: 'Bet History',
		icon: 'fas fa-chart-line text-primary',
		component: BetList,
		layout: '/history'
	}
];
export default routes;

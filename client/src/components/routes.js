import Home from './layouts/Home.js';
import AddBet from './bets/AddBet';
import BetList from './bets/BetList';
import Profile from './layouts//Profile';

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
	},
	{
		path: '/profile',
		name: 'Profile',
		icon: 'fas fa-user text-green',
		component: Profile,
		layout: '/profile'
	}
];
export default routes;

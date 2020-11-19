import React, { useState, useRef, useEffect } from 'react';

import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBets } from '../actions/bet';

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../variables/charts.js';
import Header from './Headers/Header.js';
import Sidebar from './Sidebar.js';
import routes from './routes.js';

export const Home = ({ getBets, bet: { bets, loading } }) => {
	useEffect(
		() => {
			getBets();
		},
		[ getBets ]
	);
	const unique = (arr) => {
		let lookup = {};
		var items = arr;
		var result = [];

		for (var item, i = 0; (item = items[i++]); ) {
			var name = item.competition.toLowerCase();

			if (!(name in lookup)) {
				lookup[name] = 1;
				result.push(name);
			}
		}
		return result;
	};
	const [ activeNav, setActiveNav ] = useState(1);
	const [ chartExample1Data, setChartExample1Data ] = useState('data1');
	const inputRef = useRef('mainContent');
	if (window.Chart) {
		parseOptions(Chart, chartOptions());
	}
	const toggleNavs = (e, index) => {
		e.preventDefault();
		setActiveNav(index);
		setChartExample1Data(chartExample1Data === 'data1' ? 'data2' : 'data1');
	};

	return (
		<Container fluid>
			<Sidebar
				routes={routes}
				logo={{
					innerLink: '/',
					imgSrc: require('../assets/img/brand/argon-react.png'),
					imgAlt: '...'
				}}
			/>
			<div className="main-content" ref={inputRef}>
				<Header bets={bets} />
				<Container className="mt--7" fluid>
					<Row>
						<Col className="mb-5 mb-xl-0" xl="8">
							<Card className="bg-gradient-default shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
											<h2 className="text-white mb-0">Bet Profits</h2>
										</div>
										<div className="col">
											<Nav className="justify-content-end" pills>
												<NavItem>
													<NavLink
														className={classnames('py-2 px-3', {
															active: activeNav === 1
														})}
														href="#pablo"
														onClick={(e) => toggleNavs(e, 1)}
													>
														<span className="d-none d-md-block">Month</span>
														<span className="d-md-none">M</span>
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames('py-2 px-3', {
															active: activeNav === 2
														})}
														data-toggle="tab"
														href="#pablo"
														onClick={(e) => toggleNavs(e, 2)}
													>
														<span className="d-none d-md-block">Week</span>
														<span className="d-md-none">W</span>
													</NavLink>
												</NavItem>
											</Nav>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{/* Chart */}
									<div className="chart">
										<Line
											data={chartExample1[chartExample1Data]}
											options={chartExample1.options}
											getDatasetAtEvent={(e) => console.log(e)}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col xl="4">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
											<h2 className="mb-0">Total orders</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{/* Chart */}
									<div className="chart">
										<Bar data={chartExample2.data} options={chartExample2.options} />
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="8">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Recent Bets</h3>
										</div>
										<div className="col text-right">
											<Button
												color="primary"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
												size="sm"
											>
												See all
											</Button>
										</div>
									</Row>
								</CardHeader>
								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Sport</th>
											<th scope="col">Country</th>
											<th scope="col">Competition</th>
											<th scope="col">Fixture</th>
											<th scope="col">Bet</th>
											<th scope="col">Stake</th>
											<th scope="col">Odds</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{bets.slice(0, 5).map((b) => (
											<tr>
												<th scope="row" className="text-capitalize">{b.sport}</th>
												<td className="text-capitalize">{b.country}</td>
												<td className="text-capitalize">{b.competition}</td>
												<td className="text-capitalize">{b.fixture}</td>
												<td className="text-capitalize">
													{b.market} - {b.bet}
												</td>
												<td>{b.stake}</td>
												<td>{b.odds}</td>
												<td className="text-capitalize">
													{b.status === 'pending' || 'refund' ? (
														b.status
													) : b.status === 'win' || 'half-win' ? (
														<span className="text-success">{b.status}</span>
													) : (
														<span className="text-warning">{b.status}</span>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Card>
						</Col>
						<Col xl="4">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Popular Competitions</h3>
										</div>
										<div className="col text-right">
											<Button
												color="primary"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
												size="sm"
											>
												See all
											</Button>
										</div>
									</Row>
								</CardHeader>
								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Competition</th>
											<th scope="col">No of Bets</th>
											<th scope="col" />
										</tr>
									</thead>
									<tbody>
										{unique(bets).map((b) => (
											<tr>
												<th scope="row" className="text-capitalize">{b}</th>
												<td>
													{
														bets.filter(
															(u) => u.competition.toLowerCase() === b
														).length
													}
												</td>
												<td>
													<div className="d-flex align-items-center">
														<span className="mr-2">60%</span>
														<div>
															<Progress
																max="100"
																value="60"
																barClassName="bg-gradient-danger"
															/>
														</div>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</Container>
	);
};

Home.propTypes = {
	getBets: PropTypes.func.isRequired,
	bet: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	bet: state.bet
});

export default connect(mapStateToProps, { getBets })(Home);

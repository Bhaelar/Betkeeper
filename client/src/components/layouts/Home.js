import React, { useState, useEffect } from 'react';

// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line } from 'react-chartjs-2';
// reactstrap components
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBets } from '../../actions/bet';

// core components
import { colors, chartOptions, parseOptions } from '../../variables/charts.js';
import Header1 from '../Headers/Header1.js';
import Spinner from '../Spinner';
import DefaultLayout from './DefaultLayout';

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
	const [ chartExample1Data, setChartExample1Data ] = useState('data1');
	const calc = () => {
		let profits = [];
		let sum = 0;
		for (let i = bets.length - 1; i >= 0; i--) {
			sum += bets[i].profit;
			profits.push(sum);
		}
		return profits;
	};
	const lab = () => {
		let labels = [];
		if (bets.length <= 10) {
			for (let i = 0; i <= bets.length; i++) {
				labels.push(i);
			}
		} else {
			let check = Math.round(bets.length / 10 * 100) / 100;
			let sum = 0;
			for (let i = 0; i <= 10; i++) {
				sum += check;
				sum = Math.round(sum * 100) / 100;
				labels.push(sum);
			}
		}
		return labels;
	};

	let chartExample1 = {
		options: {
			scales: {
				yAxes: [
					{
						gridLines: {
							color: colors.gray[900],
							zeroLineColor: colors.gray[900]
						},
						ticks: {
							callback: function (value) {
								if (!(value % 10)) {
									return value;
								}
							}
						}
					}
				]
			},
			tooltips: {
				callbacks: {
					label: function (item, data) {
						var label = data.datasets[item.datasetIndex].label || '';
						var yLabel = item.yLabel;
						var content = '';

						if (data.datasets.length > 1) {
							content += label;
						}

						content += yLabel;
						return content;
					}
				}
			}
		},
		data1: (canvas) => {
			return {
				labels: lab(),
				datasets: [
					{
						label: 'Performance',
						data: calc()
					}
				]
			};
		}
	};

	if (window.Chart) {
		parseOptions(Chart, chartOptions());
	}

	return loading === true ? (
		<Spinner />
	) : (
		<Container>
			<Header1 bets={bets} />
			<Container className="mt--7">
				<Row>
					<Col className="mb-5 mb-xl-0">
						<Card className="bg-gradient-default shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
										<h2 className="text-white mb-0">Bet Profits</h2>
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
											href="/history"
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
											<th scope="row" className="text-capitalize">
												{b.sport}
											</th>
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
											<th scope="row" className="text-capitalize">
												{b}
											</th>
											<td>{bets.filter((u) => u.competition.toLowerCase() === b).length}</td>
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

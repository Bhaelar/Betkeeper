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
import React, { useState, useEffect, Fragment } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Header = ({ bets }) => {
	const [ filterBets, setFilterBets ] = useState([]);
	const [ date, setDate ] = useState(0);
	const [ country, setCountry ] = useState('');

	const calcProfit = () => {
		let result = 0;
		for (let i = 0; i < bets.length; i++) {
			if (bets[i].profit) {
				result += bets[i].profit;
			}
		}
		return result;
	};

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

	let profit = calcProfit();

	const onDateChange = (e) => {
		setDate(e.target.value);
		if (e.target.value === 24) setFilterBets(bets.filter((b) => Math.abs(b.date - Date.now()) <= 1));
	};

	return (
		<Fragment>
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
				<Container fluid>
					<div className="header-body">
						{/* Card stats */}
						<Form inline>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="exampleSelect" className="mr-sm-2">
									Sort by Date
								</Label>
								<Input
									type="select"
									name="select"
									id="exampleSelect"
									value={date}
									onChange={(e) => {
										setDate(e.target.value);
										if (e.target.value === '24') {
											const ch = (a) => {
												return (
													(new Date().getTime() - new Date(a.date).getTime()) /
													(1000 * 3600 * 24)
												);
											};
											const f = bets.filter((b) => ch(b) <= 1);
											setFilterBets(f);
										}
									}}
								>
									<option value="24">Last 24 hours</option>
									<option value="7">Last 7 days</option>
									<option value="30">Last 30 days</option>
									<option value="0">All</option>
								</Input>
							</FormGroup>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="exampleSelect" className="mr-sm-2">
									Sort by Country
								</Label>
								<Input type="select" name="select" id="exampleSelect">
									<option>All</option>
									{unique(bets, country).map((b) => <option>{b}</option>)}
								</Input>
							</FormGroup>
						</Form>
						<Row>
							<Col lg="6" xl="3">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h5" className="text-uppercase text-muted mb-0">
													Profit
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{profit < 0 ? `-${profit}` : `+${profit}`}
												</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
													<i className="fas fa-chart-bar" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-success mr-2">
												<i className="fa fa-arrow-up" /> 3.48%
											</span>{' '}
											<span className="text-nowrap">Since last month</span>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col lg="6" xl="3">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h5" className="text-uppercase text-muted mb-0">
													Bets
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">{bets.length}</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-warning text-white rounded-circle shadow">
													<i className="fas fa-chart-pie" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-danger mr-2">
												<i className="fas fa-arrow-down" /> 3.48%
											</span>{' '}
											<span className="text-nowrap">Since last week</span>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col lg="6" xl="3">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h5" className="text-uppercase text-muted mb-0">
													Competitions
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">{unique(bets).length}</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
													<i className="fas fa-users" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-warning mr-2">
												<i className="fas fa-arrow-down" /> 1.10%
											</span>{' '}
											<span className="text-nowrap">Since yesterday</span>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col lg="6" xl="3">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h5" className="text-uppercase text-muted mb-0">
													Performance
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">49,65%</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-info text-white rounded-circle shadow">
													<i className="fas fa-percent" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-success mr-2">
												<i className="fas fa-arrow-up" /> 12%
											</span>{' '}
											<span className="text-nowrap">Since last month</span>
										</p>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</Fragment>
	);
};

export default Header;

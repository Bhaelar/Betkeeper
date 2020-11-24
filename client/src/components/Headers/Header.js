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
import Sort from '../bets/Sort';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Header = ({ bets, date, sport, country, competition, market, status, onDateChange, onSportChange, onCountryChange, onCompetitionChange, onMarketChange, onStatusChange }) => {
	const calcProfit = () => {
		let result = 0;
		for (let i = 0; i < bets.length; i++) {
			if (bets[i].profit) {
				result += bets[i].profit;
			}
		}
		return result;
	};

	let profit = calcProfit();

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

	return (
		<Fragment>
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
				<Container fluid>
					<div className="header-body">
						{/* Card stats */}
						<Row>
							<Col xl="4">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h5" className="text-uppercase text-muted mb-0">
													Profit
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{profit < 0 ? `${profit}` : `+${profit}`}
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
											<span className="text-nowrap">{date == 0 ? `All-time` : date == 1 ? `Since yesterday` : date == 7 ? `Since last week` : `Since last month`}</span>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col xl="4">
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
											<span className="text-nowrap">{date == 0 ? `All-time` : date == 1 ? `Since yesterday` : date == 7 ? `Since last week` : `Since last month`}</span>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col xl="4">
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
											<span className="text-nowrap">{date == 0 ? `All-time` : date == 1 ? `Since yesterday` : date == 7 ? `Since last week` : `Since last month`}</span>
										</p>
									</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Sort bets={bets} date={date} sport={sport} country={country} competition={competition} market={market} status={status} onDateChange={onDateChange} onSportChange={onSportChange} onCountryChange={onCountryChange} onCompetitionChange={onCompetitionChange} onMarketChange={onMarketChange} onStatusChange={onStatusChange} />
						</Row>
					</div>
				</Container>
			</div>
		</Fragment>
	);
};

export default Header;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlainHeader from '../Headers/PlainHeader';
import AdminNavbar from '../layouts/Navbar.js';

import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';

import { updateBet } from '../../actions/bet';

const ViewBet = (props) => {
	let history = useHistory();
	const [ formData, setFormData ] = useState({
		sport: props.location.state.sport,
		country: props.location.state.country,
		competition: props.location.state.competition,
		fixture: props.location.state.fixture,
		market: props.location.state.market,
		bet: props.location.state.bet,
		stake: props.location.state.stake,
		odds: props.location.state.odds,
		locked: props.location.state.locked,
		status: props.location.state.status
	});
	const { sport, country, competition, fixture, market, bet, stake, odds, locked, status } = formData;
	const defaultLocked = props.location.state.locked;
	const onChange = (e) => {
		if (e.target.type === 'checkbox') {
			setFormData({ ...formData, [e.target.name]: e.target.checked });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		props.updateBet(
			{
				sport,
				country,
				competition,
				fixture,
				market,
				bet,
				stake,
				odds,
				status,
				locked
			},
			props.location.state.id,
			history
		);
	};

	return (
		<Container>
			<AdminNavbar image={props.location.image} />
			<PlainHeader />
			<Container className="my-4">
				<Row>
					<div className="col">
						<Card className="bg-secondary shadow">
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">View Bet</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Form onSubmit={onSubmit}>
									<Row>
										<Col lg="12">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-sport">
													Sport
												</label>
												<Input
													className="form-control-alternative"
													name="sport"
													value={sport}
													placeholder="Sport"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-country">
													Country
												</label>
												<Input
													className="form-control-alternative"
													name="country"
													value={country}
													placeholder="Country"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-competition">
													Competition
												</label>
												<Input
													className="form-control-alternative"
													name="competition"
													value={competition}
													placeholder="Competition"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormGroup>
												<label className="form-control-label" htmlFor="input-team1">
													Fixture
												</label>
												<Input
													className="form-control-alternative"
													name="fixture"
													value={fixture}
													placeholder="Fixture"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-market">
													Market
												</label>
												<Input
													className="form-control-alternative"
													name="market"
													value={market}
													placeholder="Market"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="b">
													Bet
												</label>
												<Input
													className="form-control-alternative"
													name="bet"
													value={bet}
													placeholder="bet"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-stake">
													Stake
												</label>
												<Input
													className="form-control-alternative"
													name="stake"
													value={stake}
													placeholder="Stake"
													type="text"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-odds">
													Odds
												</label>
												<Input
													className="form-control-alternative"
													name="odds"
													value={odds}
													placeholder="Odds"
													type="number"
													onChange={onChange}
													disabled={defaultLocked}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormGroup>
												<label className="form-control-label" htmlFor="status">
													Status
												</label>
												<Input
													className="form-control-alternative"
													name="status"
													value={status}
													type="select"
													onChange={onChange}
													disabled={defaultLocked}
													required
												>
													<option value="win">Win</option>
													<option value="half-win">Half-win</option>
													<option value="pending">Pending</option>
													<option value="refund">Refund</option>
													<option value="half-loss">Half-loss</option>
													<option value="loss">Loss</option>
												</Input>
											</FormGroup>
										</Col>
									</Row>
									<hr className="my-4" />
									<div className="custom-control custom-control-alternative custom-checkbox mb-3">
										<input
											className="custom-control-input"
											id="customCheck5"
											name="locked"
											checked={locked}
											type="checkbox"
											onChange={onChange}
											disabled={defaultLocked}
										/>
										<label className="custom-control-label" htmlFor="customCheck5">
											Lock bet
											<br />
											<small className="text-warning">
												(Locked bets cannot be edited or deleted)
											</small>
										</label>
									</div>
									<div className="container-fluid">
										<Button outline color="secondary" onClick={() => history.goBack()}>
											Cancel
										</Button>
										<Button color="success" type="submit" disabled={defaultLocked}>
											Update
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</Container>
	);
};

ViewBet.propTypes = {
	updateBet: PropTypes.func.isRequired
};

export default connect(null, { updateBet })(ViewBet);

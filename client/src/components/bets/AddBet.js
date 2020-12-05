import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlainHeader from '../Headers/PlainHeader';
import AdminNavbar from '../layouts/Navbar.js';

import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';

import { addBet } from '../../actions/bet';

const AddBet = ({ addBet, history, auth: {user} }) => {
	const [ formData, setFormData ] = useState({
		sport: '',
		country: '',
		competition: '',
		team1: '',
		team2: '',
		market: '',
		bet: '',
		stake: 0,
		odds: 0,
		status: 'pending',
		locked: false,
		profit: 0
	});
	const { sport, country, competition, team1, team2, market, bet, stake, odds, status, locked, profit } = formData;

	const onChange = (e) => {
		if (e.target.type === 'checkbox') {
			setFormData({ ...formData, [e.target.name]: e.target.checked });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		addBet(
			{
				sport,
				country,
				competition,
				fixture: `${team1} vs ${team2}`,
				market,
				bet,
				stake,
				odds,
				status,
				locked,
				profit
			},
			history
		);
	};
	return (
		<Container>
			<AdminNavbar image={user.image} />
			<PlainHeader />
			<Container className="my-4">
				<Row>
					<div className="col">
						<Card className="bg-secondary shadow">
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">Add bet</h3>
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
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-team1">
													Team 1
												</label>
												<Input
													className="form-control-alternative"
													name="team1"
													value={team1}
													placeholder="Team 1"
													type="text"
													onChange={onChange}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="input-team2">
													Team 2
												</label>
												<Input
													className="form-control-alternative"
													name="team2"
													value={team2}
													placeholder="Team 2"
													type="text"
													onChange={onChange}
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
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label className="form-control-label" htmlFor="bet">
													Bet
												</label>
												<Input
													className="form-control-alternative"
													name="bet"
													value={bet}
													placeholder="Bet"
													type="text"
													onChange={onChange}
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
													required
												/>
											</FormGroup>
										</Col>
									</Row>
									<hr className="my-4" />
									<div className="custom-control custom-control-alternative custom-checkbox mb-3">
										<Input
											className="custom-control-input"
											id="customCheck5"
											name="locked"
											checked={locked}
											type="checkbox"
											onChange={onChange}
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
										<Button color="success" type="submit">
											Submit
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

AddBet.propTypes = {
	addBet: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addBet })(AddBet);

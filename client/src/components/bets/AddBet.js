import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AlertMsg from '../Alert';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar';
import routes from '../routes';

import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';

import { addBet } from '../../actions/bet';

const AddBet = ({ addBet, history }) => {
	const inputRef = useRef('mainContent');
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

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
		// console.log({ sport, country, competition, fixture: `${team1} vs ${team2}`, market, bet, stake, odds, status, locked, profit });
	};
	return (
		<Container fluid>
			<Sidebar
				routes={routes}
				logo={{
					innerLink: '/',
					imgSrc: require('../../assets/img/brand/argon-react.png'),
					imgAlt: '...'
				}}
			/>
			<div className="main-content" ref={inputRef}>
				<Container className="my-4" fluid>
					<AlertMsg />
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
											<input
												className="custom-control-input"
												name="locked"
												value={locked}
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
			</div>
		</Container>
	);
};

AddBet.propTypes = {
	addBet: PropTypes.func.isRequired
};

export default connect(null, { addBet })(AddBet);

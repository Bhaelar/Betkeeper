import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Headers/Header';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBets, updateBet, deleteBet } from '../../actions/bet';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardFooter,
	Table,
	Container,
	Row,
	Form,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

const BetList = ({ getBets, updateBet, deleteBet, history, bet: { bets, loading } }) => {
	useEffect(
		() => {
			getBets();
		},
		[ getBets ]
	);

	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	const [ date, setDate ] = useState(0);
	const [ sport, setSport ] = useState('');
	const [ country, setCountry ] = useState('');
	const [ competition, setCompetition ] = useState('');
	const [ market, setMarket ] = useState('');
	const [ status, setStatus ] = useState('');

	const onDateChange = (e) => {
		setDate(e.target.value);
	};

	const filterDate = (b) => {
		if (date === '1') {
			const ch = (a) => {
				return (new Date().getTime() - new Date(a.date).getTime()) / (1000 * 3600 * 24);
			};
			return ch(b) <= 1;
			// setFilterBets(f);
		} else if (date === '7') {
			const ch = (a) => {
				return (new Date().getTime() - new Date(a.date).getTime()) / (1000 * 3600 * 24);
			};
			return ch(b) <= 7;
			// setFilterBets(f);
		} else if (date === '30') {
			const ch = (a) => {
				return (new Date().getTime() - new Date(a.date).getTime()) / (1000 * 3600 * 24);
			};
			return ch(b) <= 30;
			// setFilterBets(f);
		} else return true;
	};

	const onSportChange = (e) => {
		setSport(e.target.value);
	};

	const onCountryChange = (e) => {
		setCountry(e.target.value);
	};

	const filterOthers = (b, c) => {
		if (c === '') {
			return true;
			// setFilterBets(f);
		} else {
			return b.toLowerCase() === c.toLowerCase();
			// setFilterBets(f);
		}
	};

	const onCompetitionChange = (e) => {
		setCompetition(e.target.value);
	};

	const onMarketChange = (e) => {
		setMarket(e.target.value);
	};

	const onStatusChange = (e) => {
		setStatus(e.target.value);
	};

	const filterBets = bets
		.filter((b) => filterDate(b))
		.filter((b) => filterOthers(b.sport, sport))
		.filter((b) => filterOthers(b.country, country))
		.filter((b) => filterOthers(b.competition, competition))
		.filter((b) => filterOthers(b.market, market))
		.filter((b) => filterOthers(b.status, status));

	return loading === true || !bets ? (
		<Spinner />
	) : (
		<Container>
			<Header
				bets={filterBets}
				date={date}
				sport={sport}
				country={country}
				competition={competition}
				market={market}
				status={status}
				onDateChange={onDateChange}
				onSportChange={onSportChange}
				onCountryChange={onCountryChange}
				onCompetitionChange={onCompetitionChange}
				onMarketChange={onMarketChange}
				onStatusChange={onStatusChange}
			/>
			<Container className="mt--7">
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<h3 className="mb-0">Bet History</h3>
							</CardHeader>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Date</th>
										<th scope="col">Sport</th>
										<th scope="col">Country</th>
										<th scope="col">Competition</th>
										<th scope="col">Fixture</th>
										<th scope="col">Bet</th>
										<th scope="col">Stake</th>
										<th scope="col">Odds</th>
										<th scope="col">Status</th>
										<th scope="col">P/L</th>
										<th scope="col" />
									</tr>
								</thead>
								<tbody>
									{filterBets.map((b) => (
										<tr key={uuidv4()}>
											<th scope="row">
												<Moment fromNow>{b.date}</Moment>
											</th>
											<td className="text-capitalize">{b.sport}</td>
											<td className="text-capitalize">{b.country}</td>
											<td className="text-capitalize">{b.competition}</td>
											<td className="text-capitalize">
												<Link
													to={{
														pathname: `/view`,
														state: {
															sport: b.sport,
															country: b.country,
															competition: b.competition,
															fixture: b.fixture,
															market: b.market,
															bet: b.bet,
															stake: b.stake,
															odds: b.odds,
															locked: b.locked,
															status: b.status,
															id: b.id
														}
													}}
												>
													{b.fixture}
												</Link>
											</td>
											<td className="text-capitalize">
												{b.market} - {b.bet}
											</td>
											<td>{b.stake}</td>
											<td>{b.odds}</td>
											<td className="text-capitalize">
												<Form>
													<Input
														type="select"
														defaultValue={b.status}
														bsSize="sm"
														className="form-control-alternative"
														onChange={(e) => {
															e.preventDefault();
															updateBet(
																{
																	sport: b.sport,
																	country: b.country,
																	competition: b.competition,
																	fixture: b.fixture,
																	market: b.market,
																	bet: b.bet,
																	stake: b.stake,
																	odds: b.odds,
																	status: e.target.value,
																	profit:
																		e.target.value === 'win'
																			? +(b.stake * b.odds - b.stake).toFixed(2)
																			: e.target.value === 'half-win'
																				? +(b.stake * Math.sqrt(b.odds) -
																						b.stake).toFixed(2)
																				: e.target.value === 'half-loss'
																					? -(b.stake / 2)
																					: e.target.value === 'loss'
																						? -b.stake
																						: 0,
																	locked: b.locked
																},
																b.id,history
															);
														}}
													>
														<option value="win">Win</option>
														<option value="half-win">Half-win</option>
														<option value="pending">Pending</option>
														<option value="refund">Refund</option>
														<option value="half-loss">Half-loss</option>
														<option value="loss">Loss</option>
													</Input>
												</Form>
											</td>
											<td>
												{b.profit > 0 ? (
													<span className="text-success">
														{Math.round(b.profit * 100) / 100}
													</span>
												) : (
													<span className="text-warning">
														{Math.round(b.profit * 100) / 100}
													</span>
												)}
											</td>
											<td>
												<Button color="danger" size="sm" onClick={toggle} disabled={b.locked}>
													<i className="fas fa-trash" />
												</Button>
												<Modal isOpen={modal} toggle={toggle}>
													<ModalHeader toggle={toggle}>Warning</ModalHeader>
													<ModalBody>Are you sure you want to delete this bet?</ModalBody>
													<ModalFooter>
														<Button
															color="danger"
															onClick={() => {
																deleteBet(b.id);
																toggle();
															}}
														>
															Delete
														</Button>{' '}
														<Button color="secondary" onClick={toggle}>
															Cancel
														</Button>
													</ModalFooter>
												</Modal>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
							<CardFooter className="py-4" />
						</Card>
					</div>
				</Row>
			</Container>
		</Container>
	);
};

BetList.propTypes = {
	getBets: PropTypes.func.isRequired,
	updateBet: PropTypes.func.isRequired,
	deleteBet: PropTypes.func.isRequired,
	bet: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	bet: state.bet
});

export default connect(mapStateToProps, { getBets, updateBet, deleteBet })(BetList);

import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import routes from '../routes';
import AlertMsg from '../Alert';
import { v4 as uuidv4 } from 'uuid';
import Sort from './Sort';
import Header from '../Headers/Header';
import Spinner from '../Spinner';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBet, getBets, updateBet } from '../../actions/bet';

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Form,
    Input
} from 'reactstrap';

const BetList = ({ getBet, getBets, updateBet, bet: { bets, loading } }) => {
	useEffect(
        () => {
            getBets();
        },
        [getBets]
    );


    const [date, setDate] = useState(0);
    const [sport, setSport] = useState('');
    const [country, setCountry] = useState('');
    const [competition, setCompetition] = useState('');
    const [market, setMarket] = useState('');
    const [status, setStatus] = useState('');

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const filterDate = (b) => {
    	if (date === '1') {
            const ch = (a) => {
                return (
                    (new Date().getTime() - new Date(a.date).getTime()) /
                    (1000 * 3600 * 24)
                );
            };
            return ch(b) <= 1;
            // setFilterBets(f);
        } else if (date === '7') {
            const ch = (a) => {
                return (
                    (new Date().getTime() - new Date(a.date).getTime()) /
                    (1000 * 3600 * 24)
                );
            };
            return ch(b) <= 7;
            // setFilterBets(f);
        } else if (date === '30') {
            const ch = (a) => {
                return (
                    (new Date().getTime() - new Date(a.date).getTime()) /
                    (1000 * 3600 * 24)
                );
            };
            return ch(b) <= 30;
            // setFilterBets(f);
        } else
            return true;
    }

    const onSportChange = (e) => {
    	setSport(e.target.value);
    }

    const onCountryChange = (e) => {
    	setCountry(e.target.value);
    }

    const filterOthers = (b, c) => {
    	if(c === '') {
    		return true;
    		// setFilterBets(f);
    	}
    	else{
    	    return b.toLowerCase() === c.toLowerCase();
    	    // setFilterBets(f);
    	}
    }

    const onCompetitionChange = (e) => {
    	setCompetition(e.target.value);
    }

    const onMarketChange = (e) => {
    	setMarket(e.target.value);
    }

    const onStatusChange = (e) => {
    	setStatus(e.target.value);
    }

    const filterBets = bets.filter((b) => filterDate(b)).filter((b) => filterOthers(b.sport, sport)).filter((b) => filterOthers(b.country, country)).filter((b) => filterOthers(b.competition, competition)).filter((b) => filterOthers(b.market, market)).filter((b) => filterOthers(b.status, status));
    const inputRef = useRef('mainContent');
    return loading === true ? (
		<Spinner />
	) : (
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
				<Header bets={filterBets} date={date} sport={sport} country={country} competition={competition} market={market} status={status} onDateChange={onDateChange} onSportChange={onSportChange} onCountryChange={onCountryChange} onCompetitionChange={onCompetitionChange} onMarketChange={onMarketChange} onStatusChange={onStatusChange} />
				<Container className="mt--7" fluid>
					{/* Table */}
					<AlertMsg />
					<Row>
						<div className="col">
							<Card className="shadow">
								<CardHeader className="border-0">
									<h3 className="mb-0">Bet History</h3>
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
											<th scope="col">P/L</th>
											<th scope="col" />
										</tr>
									</thead>
									<tbody>
										{
											filterBets.map((b) => (
											<tr key={uuidv4()}>
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
													<Form>
														<Input
															type="select"
															defaultValue={b.status}
															bsSize="sm"
															className="form-control-alternative"
															onChange={(e) => {
																e.preventDefault();
																getBet(b.id);
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
																				? b.stake * b.odds - b.stake
																				: e.target.value === 'half-win'
																					? b.stake * Math.sqrt(b.odds) -
																						b.stake
																					: e.target.value === 'half-loss'
																						? -(b.stake / 2)
																						: e.target.value === 'loss'
																							? -b.stake
																							: 0,
																		locked: b.locked
																	},
																	b.id
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
														<span className="text-success">{b.profit}</span>
													) : (
														<span className="text-warning">{b.profit}</span>
													)}
												</td>
											</tr>
										))
									}
									</tbody>
								</Table>
								<CardFooter className="py-4">
									<nav aria-label="...">
										<Pagination
											className="pagination justify-content-end mb-0"
											listClassName="justify-content-end mb-0"
										>
											<PaginationItem className="disabled">
												<PaginationLink
													href="#pablo"
													onClick={(e) => e.preventDefault()}
													tabIndex="-1"
												>
													<i className="fas fa-angle-left" />
													<span className="sr-only">Previous</span>
												</PaginationLink>
											</PaginationItem>
											<PaginationItem className="active">
												<PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
													1
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
													2 <span className="sr-only">(current)</span>
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
													3
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
													<i className="fas fa-angle-right" />
													<span className="sr-only">Next</span>
												</PaginationLink>
											</PaginationItem>
										</Pagination>
									</nav>
								</CardFooter>
							</Card>
						</div>
					</Row>
				</Container>
			</div>
		</Container>
    );
};

BetList.propTypes = {
    getBets: PropTypes.func.isRequired,
    getBet: PropTypes.func.isRequired,
    updateBet: PropTypes.func.isRequired,
    bet: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    bet: state.bet
});

export default connect(mapStateToProps, { getBet, getBets, updateBet })(BetList);
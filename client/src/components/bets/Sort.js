import React, { useState, useEffect, Fragment } from 'react'

import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const Sort = ({ bets, date, sport, country, competition, market, status, onDateChange, onSportChange, onCountryChange, onCompetitionChange, onMarketChange, onStatusChange }) => {
    const spunique = (arr) => {
        let lookup = {};
        var items = arr;
        var result = [];

        for (var item, i = 0;
            (item = items[i++]);) {
            var name = item.sport.toLowerCase();

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result;
    };

    const counique = (arr) => {
        let lookup = {};
        var items = arr;
        var result = [];

        for (var item, i = 0;
            (item = items[i++]);) {
            var name = item.country.toLowerCase();

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result;
    };

    const coounique = (arr) => {
        let lookup = {};
        var items = arr;
        var result = [];

        for (var item, i = 0;
            (item = items[i++]);) {
            var name = item.competition.toLowerCase();

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result;
    };

    const munique = (arr) => {
        let lookup = {};
        var items = arr;
        var result = [];

        for (var item, i = 0;
            (item = items[i++]);) {
            var name = item.market.toLowerCase();

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result;
    };

    const sunique = (arr) => {
        let lookup = {};
        var items = arr;
        var result = [];

        for (var item, i = 0;
            (item = items[i++]);) {
            var name = item.status.toLowerCase();

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result;
    };

    return (
        <Container className="mx-auto" style={{textAlign: 'center'}}>
            <Form inline>
            	<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Date
								</Label>
								<Input
									type="select"
									name="select"
									bsSize="sm"
									id="exampleSelect"
									className="form-control-alternative"
									value={date}
									onChange={onDateChange}
								>
									<option value="1">Last 24 hours</option>
									<option value="7">Last 7 days</option>
									<option value="30">Last 30 days</option>
									<option value="0">All</option>
								</Input>
							</FormGroup>
							<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Sport
								</Label>
								<Input type="select" name="select" id="exampleSelect" className="form-control-alternative" bsSize="sm" value={sport} onChange={onSportChange}>
									<option value=''>All</option>
									{spunique(bets).map((b) => <option className="text-capitalize" value={b}>{b}</option>)}
								</Input>
							</FormGroup>
							<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Country
								</Label>
								<Input type="select" name="select" bsSize="sm" id="exampleSelect" className="form-control-alternative" value={country} onChange={onCountryChange}>
									<option value=''>All</option>
									{counique(bets).map((b) => <option className="text-capitalize" value={b}>{b}</option>)}
								</Input>
							</FormGroup>
							<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Competition
								</Label>
								<Input type="select" name="select" bsSize="sm" id="exampleSelect" className="form-control-alternative" value={competition} onChange={onCompetitionChange}>
									<option value=''>All</option>
									{coounique(bets).map((b) => <option className="text-capitalize" value={b}>{b}</option>)}
								</Input>
							</FormGroup>
							<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Market
								</Label>
								<Input type="select" name="select" bsSize="sm" id="exampleSelect" className="form-control-alternative" value={market} onChange={onMarketChange}>
									<option value=''>All</option>
									{munique(bets).map((b) => <option className="text-capitalize" value={b}>{b}</option>)}
								</Input>
							</FormGroup>
							<FormGroup className="pt-3 pr-3">
								<Label for="exampleSelect" className="form-control-label mx-2 text-sm">
									Sort by Status
								</Label>
								<Input type="select" name="select" bsSize="sm" id="exampleSelect" className="form-control-alternative" value={status} onChange={onStatusChange}>
									<option value=''>All</option>
									{sunique(bets).map((b) => <option className="text-capitalize" value={b}>{b}</option>)}
								</Input>
							</FormGroup>
						</Form>
        </Container>
    )
}

export default Sort
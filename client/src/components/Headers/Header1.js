import React, { Fragment } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const Header1 = ({ bets }) => {
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
        <Container>
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
                          {profit < 0 ? `${(Math.round(profit * 100) / 100)}` : `+${(Math.round(profit * 100) / 100)}`}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">All-time</span>
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
                      <span className="text-nowrap">All-time</span>
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
                      <span className="text-nowrap">All-time</span>
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

export default Header1;

import React, {useRef} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Spinner from '../Spinner';
import AdminNavbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar.js';
import routes from '../routes.js';
import AlertMsg from '../Alert';
import Footer from '../Footers/Footer.js';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  const inputRef = useRef('mainContent');
  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
            <>
            <Sidebar
              routes={routes}
              logo={{
                innerLink: '/',
                imgSrc: user.image,
                imgAlt: '...'
              }}
            />
              <div className="main-content" ref={inputRef}>
                <AlertMsg />
                <AdminNavbar image={user.image} />
                <Component {...props} />
                <Container fluid>
                  <Footer />
                </Container>
              </div>
              </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
)};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

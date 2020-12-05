import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, logout } from '../../actions/auth';
import { Link } from 'react-router-dom';

// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Navbar,
	Nav,
	Container,
	Media
} from 'reactstrap';

// import image from '../../assets/img/theme/team-4-800x800.jpg';

const AdminNavbar = ({ image, logout }) => {
	return (
		<Fragment>
			<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
				<Container fluid>
					<Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
						Dashboard
					</Link>
					<Nav className="align-items-center d-none d-md-flex" navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle className="pr-0" nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={image} />
									</span>
									<Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold" />
									</Media>
								</Media>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								<DropdownItem to="/profile" tag={Link}>
									<i className="ni ni-single-02" />
									<span>My profile</span>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem onClick={logout}>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
		</Fragment>
	);
};

AdminNavbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(AdminNavbar);

/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col
} from 'reactstrap';

import image from '../../assets/img/betkeeper-logo.png';

var ps;

class Sidebar extends React.Component {
	state = {
		collapseOpen: false
	};
	constructor (props) {
		super(props);
		this.activeRoute.bind(this);
	}
	// verifies if routeName is the one active (in browser input)
	activeRoute (routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
	}
	// toggles collapse between opened and closed (true/false)
	toggleCollapse = () => {
		this.setState({
			collapseOpen: !this.state.collapseOpen
		});
	};
	// closes the collapse
	closeCollapse = () => {
		this.setState({
			collapseOpen: false
		});
	};
	// creates the links that appear in the left menu / Sidebar
	createLinks = (routes) => {
		return routes.map((prop, key) => {
			return (
				<NavItem key={key}>
					<NavLink to={prop.path} tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
						<i className={prop.icon} />
						{prop.name}
					</NavLink>
				</NavItem>
			);
		});
	};
	render () {
		const { bgColor, routes, logo } = this.props;
		let navbarBrandProps;
		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link
			};
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: '_blank'
			};
		}
		return (
			<Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
				<Container fluid>
					{/* Toggler */}
					<button className="navbar-toggler" type="button" onClick={this.toggleCollapse}>
						<span className="navbar-toggler-icon" />
					</button>
					{/* Brand */}
					<NavbarBrand className="pt-0" {...navbarBrandProps}>
						<img alt="betkeeper-logo" className="navbar-brand-img" src={image} />
					</NavbarBrand>
					
					{/* User */}
					<Nav className="align-items-center d-md-none">
						<UncontrolledDropdown nav>
							<DropdownToggle nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={logo.imgSrc} />
									</span>
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
								<DropdownItem onClick={this.props.logout}>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					{/* Collapse */}
					<Collapse navbar isOpen={this.state.collapseOpen}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								{logo ? (
									<Col className="collapse-brand" xs="6">
										{logo.innerLink ? (
											<Link to={logo.innerLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</Link>
										) : (
											<a href={logo.outterLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</a>
										)}
									</Col>
								) : null}
								<Col className="collapse-close" xs="6">
									<button className="navbar-toggler" type="button" onClick={this.toggleCollapse}>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						{/* Navigation */}
						<Nav navbar>{this.createLinks(routes)}</Nav>
						{/* Divider */}
						<hr className="my-3" />
						{/* Heading */}
						<h6 className="navbar-heading text-muted">Social</h6>
						{/* Navigation */}
						<Nav className="mb-md-3" navbar>
							<NavItem>
								<NavLink to="/feed" tag={NavLinkRRD} onClick={this.closeCollapse}>
									<i className="ni ni-align-center" />
									My feed
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/tipsters" tag={NavLinkRRD} onClick={this.closeCollapse}>
									<i className="ni ni-world-2" />
									Hottest tipsters
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/contests" tag={NavLinkRRD} onClick={this.closeCollapse}>
									<i className="ni ni-trophy" />
									Contests
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

Sidebar.defaultProps = {
	routes: [ {} ]
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logout: PropTypes.func.isRequired,
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired
	})
};

export default connect(null, {logout})(Sidebar);

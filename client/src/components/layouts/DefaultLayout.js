import React, { Fragment, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AlertMsg from '../Alert';
import Footer from '../Footers/Footer.js';
import AdminNavbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import routes from '../routes.js';

const DefaultLayout = ({user, ...otherProps}) => {
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	});
	const inputRef = useRef('mainContent');
	return (
		<Fragment>
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
				{/*<AdminNavbar image={user.image} />*/}
				{otherProps.children}
				<Container fluid>
					<Footer />
				</Container>
			</div>
		</Fragment>
	)
};

export default DefaultLayout;

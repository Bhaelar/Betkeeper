import React, { Fragment, useEffect, useRef } from 'react';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AlertMsg from '../Alert';
import Footer from '../Footers/Footer.js';
import Sidebar from './Sidebar.js';
import routes from '../routes.js';

const DefaultLayout = (props) => {
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
					imgSrc: require('../../assets/img/brand/argon-react.png'),
					imgAlt: '...'
				}}
			/>
			<div className="main-content" ref={inputRef}>
				<AlertMsg />
				{props.children}
				<Container fluid>
					<Footer />
				</Container>
			</div>
		</Fragment>
	);
};

export default DefaultLayout;

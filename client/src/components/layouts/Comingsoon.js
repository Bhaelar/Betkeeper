import React, {Fragment} from 'react';

import { Container } from "reactstrap";

import image from "../../assets/img/loading_.png";
import PlainHeader from '../Headers/PlainHeader';

const Comingsoon = () => {
	return (
		<Fragment>
			<Container>
				<PlainHeader />
				<h1 className="display-4 pt-5 text-center">Coming Soon...</h1>
				<Container className="pt-6 pl-4" style={{margin: 'auto'}}>
					<img alt="coming soon" src={image} style={{'width': '50%', 'height': '50%'}} />
				</Container>
			</Container>
		</Fragment>
	)
}

export default Comingsoon;
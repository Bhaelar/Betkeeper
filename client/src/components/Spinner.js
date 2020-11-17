import React from 'react';

const Spinner = (props) => {
	return (
		<div className="text-center spinner">
			<div className="spinner-border text-primary" role="status">
				<span className="sr-only">{props.message}</span>
			</div>
		</div>
	);
};

Spinner.defaultProps = {
	message: 'Loading...'
};

export default Spinner;

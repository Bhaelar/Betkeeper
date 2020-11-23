import React from 'react';

const Spinner = (props) => {
	return (
		<div
			className="text-center spinner"
			style={{
				position: 'fixed',
				zIndex: 1031,
				top: '50%',
				left: '50%',
				transform: 'translate(' - 50 % ', ' - 50 % ')'
			}}
		>
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

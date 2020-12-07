import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AlertMsg from '../Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, user }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login(formData);
	};

	if (isAuthenticated && user) {
	    return <Redirect to="/" />;
	 }
	return (
		<div className="container-fluid">
			<AlertMsg />
			<div className="row no-gutter">
				<div className="col-md-12 col-lg-6 mx-auto">
					<div className="login d-flex align-items-center py-5">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-8 mx-auto">
									<h3 className="login-heading mb-4">Welcome back!</h3>
									<form onSubmit={onSubmit}>
										<div className="form-label-group">
											<input
												type="email"
												name="email"
												value={email}
												onChange={onChange}
												className="form-control"
												placeholder="Email address"
												required
											/>
										</div>

										<div className="form-label-group">
											<input
												type="password"
												name="password"
												value={password}
												onChange={onChange}
												className="form-control"
												placeholder="Password"
												pattern=".{6,}"
												required
												title="6 characters minimum"
											/>
										</div>

										<div className="custom-control custom-checkbox mb-3">
											<input type="checkbox" className="custom-control-input" id="customCheck1" />
											<label className="custom-control-label" for="customCheck1">
												Remember password
											</label>
										</div>

										<button
											className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
											type="submit"
										>
											Sign in
										</button>
										<div className="text-center">
											<Link className="small" to="/register">
												Create an account
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
  	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);

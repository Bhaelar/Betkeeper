import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AlertMsg from '../Alert';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ register, history }) => {
	const [ formData, setFormData ] = useState({
        username: '',
		email: '',
        password: '',
        password2: ''
  });
  const { username, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
	const onSubmit = async (e) => {
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ username, email, password }, history);
		}
	};
	return (
		<div className="container-fluid">
			<AlertMsg />
			<div className="row no-gutter">
				<div className="col-md-12 col-lg-6 mx-auto">
					<div className="login d-flex align-items-center py-5">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-8 mx-auto">
									<h3 className="login-heading mb-4">Welcome!</h3>
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
                                                type="text"
                                                name="username"
												value={username}
                                    onChange={onChange}
												className="form-control"
												placeholder="Username"
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
                                                autoComplete="new-password"
												pattern=".{6,}"
												required title="6 characters minimum"
											/>
                                        </div>
                                        
                                        <div className="form-label-group">
											<input
												type="password"
                                                name="password2"
                                                value={password2}
                                    onChange={onChange}
												className="form-control"
                                                placeholder="Re-enter password"
                                                autoComplete="new-password"
												pattern=".{6,}"
												required title="6 characters minimum"
											/>
										</div>

										<button
											className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
											type="submit"
										>
											Sign Up
										</button>
										<div className="text-center">
											<Link className="small" to="/">
												Login
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

Register.propTypes = {
	register: PropTypes.func.isRequired
};


export default connect(null, { register })(Register);

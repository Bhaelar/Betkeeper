import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { countries } from '../../utils/market';
import AdminNavbar from './Navbar.js';

// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from 'reactstrap';
// core components
import ProfileHeader from '../Headers/ProfileHeader.js';

const Profile = ({ updateUser, auth: { user } }) => {
	const [ formData, setFormData ] = useState({
		country: user.country,
		fav_team: user.fav_team
	});
	const [ image, setImage ] = useState(user.image);
	const [ status, setStatus ] = useState('');
	const { country, fav_team } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onImageChange = (e) => {
		const fileInput = e.target;
		const imageFile = fileInput.files[0];
		setStatus('');
		const formData = new FormData();
		formData.append('image', imageFile);
		formData.append('album', 'TVmjTFAltRMLmiO');
		fetch('https://api.imgur.com/3/image', {
			method: 'post',
			headers: {
				Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
			},
			body: formData
		})
			.then((data) => data.json(), setStatus('Uploading...'))
			.then((data) => setImage(data.data.link), setStatus('Uploaded...'))
			.catch((error) => {
				console.error(error);
			});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		updateUser({ country, fav_team, image });
	};

	return (
		<Fragment>
			<AdminNavbar image={user.image} />
			<ProfileHeader username={user.username} />
			{/* Page content */}
			<Container className="mt--7">
				<Row>
					<Col>
						<Card className="bg-secondary shadow">
							<Row className="justify-content-center">
								<Col className="order-lg-2" lg="3">
									<div className="card-profile-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img alt="..." className="rounded-circle" src={user.image} />
										</a>
									</div>
								</Col>
							</Row>
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">My account</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Form onSubmit={onSubmit}>
									<h6 className="heading-small text-muted mb-4">User information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-username">
														Username
													</label>
													<Input
														className="form-control-alternative"
														defaultValue={user.username}
														id="input-username"
														placeholder="Username"
														type="text"
														disabled
													/>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-email">
														Email address
													</label>
													<Input
														className="form-control-alternative"
														defaultValue={user.email}
														id="input-email"
														placeholder="Email"
														type="email"
														disabled
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup>
													<label className="form-control-label" htmlFor="image">
														Image
													</label>
													<Input
														className="form-control-alternative"
														id="image"
														name="image"
														type="file"
														accept="image/*"
														onChange={onImageChange}
													/>
													<small>{status}</small>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="country">
														Country
													</label>
													<Input
														className="form-control-alternative"
														id="country"
														name="country"
														type="select"
														value={country}
														onChange={onChange}
													>
														<option value="">Select Country</option>
														{countries.map((country) => (
															<option value={country.name}>{country.name}</option>
														))}
													</Input>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="favorite-team">
														Favorite team
													</label>
													<Input
														className="form-control-alternative"
														id="favorite-team"
														name="fav_team"
														value={fav_team}
														placeholder="Favorite team"
														onChange={onChange}
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
									<hr className="my-4" />
									<div className="text-center">
										<Button color="success" type="submit">
											Update
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { updateUser })(Profile);

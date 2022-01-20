import { Redirect, useHistory } from 'react-router-dom';
// import axios from 'axios';
import { Button } from '@mui/material';
import jwt_decode from 'jwt-decode';

import '../css/home.css';

// import { Fragment, useState } from 'react';
import { Fragment, useState, useEffect } from 'react';

const HomeRoute = () => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(false);
	const [ id, setId ] = useState('');

	const history = useHistory();
	const routeChangeLogin = () => {
		let path = `Login`;
		history.push(path);
	};

	const routeChangeSignup = () => {
		let path = `Signup`;
		history.push(path);
	};
	useEffect(() => {
		let isCancelled = false;

		if (!isCancelled) {
			try {
				var decode = jwt_decode(localStorage.getItem('token'));
				let user = decode.id;

				if (user) {
					setIsAuthenticated(true);
					setId(user);
				}
				console.log(user);
			} catch (err) {
				console.log(err);
			}
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	// isAuthenticated == true && id !== ''

	if (isAuthenticated) {
		return <Redirect to={'/t/' + id} />;
	} else {
		return (
			<Fragment>
				<div className="wrapper">
					<div className="header">
						<div className="header-wrapper">
							<div className="title">
								{' '}
								<p>How well do you know you?</p>{' '}
							</div>
							<div className="discption">
								<p> Create your own questions let your firends answer</p>{' '}
							</div>
						</div>
					</div>
					<div className="footer">
						<div className="footer-wrapper">
							<Button
								onClick={routeChangeSignup}
								variant="contained"
								color="secondary"
								type="submit"
								style={{ marginTop: '10px', width: '100px' }}
							>
								{' '}
								sign Up
							</Button>
							<Button
								onClick={routeChangeLogin}
								variant="contained"
								color="primary"
								type="submit"
								style={{ marginTop: '10px', width: '100px' }}
							>
								{' '}
								Login
							</Button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
};

export default HomeRoute;

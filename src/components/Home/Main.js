import { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Redirect } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Users from '../users/Users';
import '../css/alert.css';

import Question from '../createQuestions/Question.js';
// import Answer from '../aswerQuestions.js/Answer';
import Result from '../result/Result';

// const decoded = jwt_decode(localStorage.getItem('token'));

const Main = () => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(false);
	const [ value, setValue ] = useState('2');
	const [ isLoading, setIsLoading ] = useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		let isCancelled = false;

		if (!isCancelled) {
			if (true) {
				// console.log(decoded);
				setIsAuthenticated(true);
				setIsLoading(false);
			}
		}

		return () => {
			isCancelled = true;
		};
	}, []);

	if (isLoading) {
		return (
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					width: '100%'
				}}
			>
				<CircularProgress />
			</Box>
		);
	} else {
		return (
			<Fragment>
				{isAuthenticated ? (
					<Box sx={{ width: '100%', typography: 'body1' }}>
						<TabContext value={value}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<div className="tabList-center">
									<TabList onChange={handleChange} aria-label="lab API tabs example">
										<Tab label="Users" value="1" />
										<Tab label="Create Question" value="2" />
										<Tab label="Your result" value="3" />
									</TabList>
								</div>
							</Box>
							<TabPanel
								value="1"
								sx={{
									padding: 0
								}}
							>
								<Users />
							</TabPanel>
							<TabPanel
								value="2"
								sx={{
									padding: 0
								}}
							>
								<Question />
							</TabPanel>
							<TabPanel
								value="3"
								sx={{
									padding: 0
								}}
							>
								<Result />
							</TabPanel>
						</TabContext>
					</Box>
				) : (
					<Redirect to="/Login" />
				)}
			</Fragment>
		);
	}
};

export default Main;

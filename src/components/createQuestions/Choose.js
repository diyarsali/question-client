import React from 'react';

const Choose = ({ letter, answer }) => {
	return (
		<div className=" Choosquestion-group-each">
			<p className="each-letter" style={{ fontWeight: 'bold' }}>
				{' '}
				{letter}
			</p>
			<p>{answer}</p>
		</div>
	);
};

export default Choose;

import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'components/Header';

ReactDOM.render(<Main />,
	document.getElementById('main'));

function Main() {
	return (<>
		<Header />
		<h1>This is index.</h1>
		<p><a href="second.html">Second</a></p>
	</>);
}

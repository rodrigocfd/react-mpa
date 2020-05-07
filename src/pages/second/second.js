import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'components/Header';

ReactDOM.render(<Main />,
	document.getElementById('main'));

function Main() {
	return (<>
		<Header />
		<p>You came to the second.</p>
		<p><a href="../index.html">Index</a></p>
	</>);
}

import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'src/common/Header';
import frog from './frog.jpg';

function Index() {
	return (<>
		<Header />
		<h1>This is main index.</h1>
		<p><a href="second/second.html?name=You">Go to Second</a></p>
		<p><img src={frog} /></p>
	</>);
}

ReactDOM.render(<Index />,
	document.getElementById('mountPoint'));

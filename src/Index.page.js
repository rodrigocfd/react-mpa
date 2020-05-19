import React from 'react';
import ReactDOM from 'react-dom';

import frog from '@assets/frog.jpg';
import Header from '@src/common/Header';

function Index() {
	return (<>
		<Header />
		<h1>This is main index.</h1>
		<p><a href="my-second/my-second.html?name=You">Go to Second</a></p>
		<p><img src={frog} /></p>
	</>);
}

ReactDOM.render(<Index />,
	document.getElementById('mountPoint'));

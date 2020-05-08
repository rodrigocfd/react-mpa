import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'src/components/Header';
import apple from './apple.jpg';
import c from './second.css';

ReactDOM.render(<Second />,
	document.getElementById('mountPoint'));

function Second() {
	return (<>
		<Header />
		<p className={c.red}>You came to the second.</p>
		<p><a href="../index.html">Index</a></p>
		<p><img src={apple} /></p>
	</>);
}

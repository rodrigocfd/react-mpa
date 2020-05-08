import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'src/common/Header';
import TitleFool from './TitleFool';
import apple from './apple.jpg';
import c from './second.css';

function Second() {
	const url = new URL(window.location);
	const name = url.searchParams.get('name');

	return (<>
		<Header />
		<TitleFool name={name} />
		<p className={c.red}>You came to the second.</p>
		<p><a href="../index.html">Go to Index</a></p>
		<p><img src={apple} /></p>
	</>);
}

ReactDOM.render(<Second />,
	document.getElementById('mountPoint'));

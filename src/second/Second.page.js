import React from 'react';
import ReactDOM from 'react-dom';

import Header from 'src/common/Header';
import TitleFool from './TitleFool';
import apple from './apple.jpg';
import c from './second.css';

function Second() {
	return (<>
		<Header />
		<TitleFool name="You" />
		<p className={c.red}>You came to the second.</p>
		<p><a href="../index.html">Go to Index</a></p>
		<p><img src={apple} /></p>
	</>);
}

ReactDOM.render(<Second />,
	document.getElementById('mountPoint'));

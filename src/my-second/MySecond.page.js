import React from 'react';
import ReactDOM from 'react-dom';

import apple from '@assets/apple.jpg';
import Header from '@src/common/Header';
import TitleFool from './TitleFool';
import c from './MySecond.scss';

function MySecond() {
	const url = new URL(window.location);
	const name = url.searchParams.get('name');

	return (<>
		<Header />
		<div className={c.body}>
			<TitleFool name={name} />
			<p className={c.red}>You came to the second.</p>
			<p><a href="../index.html">Go to Index</a></p>
			<p><img src={apple} /></p>
		</div>
	</>);
}

ReactDOM.render(<MySecond />,
	document.getElementById('mountPoint'));

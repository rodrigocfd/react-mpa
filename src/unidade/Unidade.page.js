import React from 'react';

import app from 'src/app';
import Arvore from 'src/comum/arvore/Arvore';
import c from './Unidade.scss';

function Unidade() {
	const [uns, setUns] = React.useState([]);

	let trilha = '';
	for (let i = 1; i < uns.length; ++i) {
		trilha += uns[i].sigla + ' > ';
	}
	trilha = trilha.substr(0, trilha.length - 3);
	if (!trilha.length) trilha = '...';

	return (
		<div>
			<h1>Unidade</h1>
			<div>{trilha}</div>
			<div className={c.arvore} onMouseLeave={() => setUns([])}>
				<Arvore idRaiz={1} onMouseOver={uns => setUns(uns)}
					onClick={uns => console.log(uns)} />
			</div>
			<br /><br />
			<div><a href={app.montaUrlApp('index.html')}>Retornar</a></div>
		</div>
	);
}

app.constroiPagina(<Unidade />);

import React from 'react';

import app from '@src/app';
import UnidadeNoArvore from '@src/dto/UnidadeNoArvore';
import Arvore from '@src/comum/arvore/Arvore';
import c from './Unidade.scss';

function Unidade() {
	const [unid, setUnid] = React.useState({} as UnidadeNoArvore);

	React.useEffect(() => {
		app.serverGet(`/arvore/unidade?id=1`)
			.then((u: UnidadeNoArvore) => setUnid(u));
	}, []);

	return (
		<div>
			<div className={c.arvore}>
				<Arvore unidade={unid} />
			</div>
			<div><a href={app.montaUrlApp('index.html')}>Retornar</a></div>
		</div>
	);

	/*const [hieUnidsSel, setHieUnidsSel] = React.useState(null);
	const [trilhaUnids, setTrilhaUnids] = React.useState([]);

	let trilhaStr = '';
	for (let i = 1; i < trilhaUnids.length; ++i) {
		trilhaStr += trilhaUnids[i].sigla + ' > ';
	}
	trilhaStr = trilhaStr.substr(0, trilhaStr.length - 3);
	if (!trilhaStr.length) trilhaStr = '...';

	return (
		<div>
			<h1>Un: {hieUnidsSel && hieUnidsSel[hieUnidsSel.length - 1].denominacao}</h1>
			<div className={c.trilha}>{trilhaStr}</div>
			<div className={c.arvore} onMouseLeave={() => setTrilhaUnids([])}>
				<Arvore idRaiz={1} onMouseOver={uns => setTrilhaUnids(uns)}
					onClick={hieUnids => setHieUnidsSel(hieUnids)} />
			</div>
			<br /><br />
			<div><a href={app.montaUrlApp('index.html')}>Retornar</a></div>
		</div>
	);*/
}

app.constroiPagina(<Unidade />);

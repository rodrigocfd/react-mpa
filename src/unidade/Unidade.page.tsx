import React from 'react';

import app from '@src/app';
import Arvore from '@src/comum/arvore/Arvore';
import {ComAbas, Aba} from '@src/comum/ComAbas';
import c from './Unidade.scss';

function Unidade() {
	return (
		<div className={c.flex}>
			<div className={c.esquerda}>
				<div className={c.arvore}>
					<Arvore idSelecionada={23} onClick={u => console.log(u[u.length  - 1])} />
				</div>
				<div><a href={app.montaUrlApp('index.html')}>Retornar</a></div>
			</div>
			<div className={c.direita}>
				<ComAbas abas={[
					{titulo: 'Primeira', conteudo: <div>FOO FOO FOO FOO FOO</div>},
					{titulo: 'Segunda', conteudo: <div>asdf asdf asdasd asdasd</div>},
				]} />
			</div>
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

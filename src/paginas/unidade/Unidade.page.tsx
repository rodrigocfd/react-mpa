import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@comum/app';
import Link from '@comum/Link';
import Arvore from '@comum/arvore/Arvore';
import Dados from './Dados';
import c from './Unidade.scss';

function Unidade() {
	const [hierarquiaSelec, setHierarquiaSelec] = React.useState([] as UnidadeNoArvore[]);

	function selecionouUnidade(hierarquiaSelec: UnidadeNoArvore[]) {
		setHierarquiaSelec(hierarquiaSelec);
	}

	return (
		<div className={c.flex}>
			<div className={c.esquerda}>
				<div className={c.arvore}>
					<Arvore idSelecionada={23} onSelecionaUnidade={selecionouUnidade} />
				</div>
				<div><Link dest="app" href="index.html">Retornar</Link></div>
			</div>
			<div className={c.direita}>
				<Dados idUnidade={hierarquiaSelec.last()?.id} />
			</div>
		</div>
	);
}

app.constroiPagina(<Unidade />);

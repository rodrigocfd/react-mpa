import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@comum/app';
import Link from '@comum/Link';
import Arvore from '@comum/arvore/Arvore';
import Dados from './Dados';
import styles from './Unidade.scss';

function Unidade() {
	const [hierarquiaSelec, setHierarquiaSelec] = React.useState([] as UnidadeNoArvore[]);

	function selecionouUnidade(hierarquiaSelec: UnidadeNoArvore[]) {
		setHierarquiaSelec(hierarquiaSelec);
	}

	return (<>
		<h1>Unidade</h1>
		<div className={styles.flex}>
			<div className={styles.esquerda}>
				<div className={styles.arvore}>
					<Arvore idSelecionada={23} onSelecionaUnidade={selecionouUnidade} />
				</div>
				<div><Link dest="app" href="index.html">Retornar</Link></div>
			</div>
			<div className={styles.direita}>
				<Dados idUnidade={hierarquiaSelec.last()?.id} />
			</div>
		</div>
	</>);
}

app.constroiPagina(<Unidade />);

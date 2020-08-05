import React from 'react';

import styles from './IconeUnidade.scss';

interface Valores { // usado internamente no componente
	[key: string]: {
		ico: string,
		lbl: string,
	}
}

interface Props {
	chave: string,
}

/**
 * Ícones que precedem o nome da unidade num nó da árvore.
 */
function IconeUnidade({chave}: Props) {
	const vals: Valores = {
		ET: { ico: styles.icoET, lbl: 'Ente' },
		OR: { ico: styles.icoOR, lbl: 'Órgão' },
		EN: { ico: styles.icoEN, lbl: 'Entidade' },
		UA: { ico: styles.icoUA, lbl: 'Unidade Administrativa' },
		UC: { ico: styles.icoUC, lbl: 'Unidade Colegiada' },
		RE: { ico: styles.icoRE, lbl: 'Unidade Administrativa com Regulamento Específico' },

		LEID: { ico: styles.icoLEID, lbl: 'Normatização: Lei/Decreto' },
		ATOI: { ico: styles.icoATOI, lbl: 'Normatização: Ato Interno' },
	};

	return (
		<div className={vals[chave].ico}
			title={vals[chave].lbl}></div>
	);
}

export default IconeUnidade;

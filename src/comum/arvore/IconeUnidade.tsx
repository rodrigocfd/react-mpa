import React from 'react';

import c from './IconeUnidade.scss';

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
		ET: { ico: c.icoET, lbl: 'Ente' },
		OR: { ico: c.icoOR, lbl: 'Órgão' },
		EN: { ico: c.icoEN, lbl: 'Entidade' },
		UA: { ico: c.icoUA, lbl: 'Unidade Administrativa' },
		UC: { ico: c.icoUC, lbl: 'Unidade Colegiada' },
		RE: { ico: c.icoRE, lbl: 'Unidade Administrativa com Regulamento Específico' },

		LEID: { ico: c.icoLEID, lbl: 'Normatização: Lei/Decreto' },
		ATOI: { ico: c.icoATOI, lbl: 'Normatização: Ato Interno' },
	};

	return (
		<div className={vals[chave].ico}
			title={vals[chave].lbl}></div>
	);
}

export default IconeUnidade;

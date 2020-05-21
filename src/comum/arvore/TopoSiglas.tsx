import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import c from './TopoSiglas.scss';

interface Props {
	tripaUnids: UnidadeNoArvore[],
}

function TopoSiglas({tripaUnids}: Props) {
	let trilha = '';

	if (tripaUnids.length > 0) {
		const maxN = 6; // quantidade máxima de níveis hierárquicos a serem exibidos

		if (tripaUnids.length > maxN + 1) { // mais unidades que o máximo, algumas não serão exibidas
			trilha += '... › '
		}

		const uBase = (tripaUnids[0].id === 1) ? 1 : 0; // República Federativa do Brasil não tem sigla, pula
		const inicio = Math.max(uBase, tripaUnids.length - maxN);
		for (let i = inicio; i < tripaUnids.length; ++i) {
			let sigla = tripaUnids[i].sigla;
			if (sigla.length === 0 || sigla === ' ') sigla = '∅';
			trilha += sigla + ' › ';
		}
		trilha = trilha.substr(0, trilha.length - 3);

		if (!trilha.length) { // vazio?
			trilha = '\u00A0'; // &nbsp; pra não colapsar verticalmente a div
		}
	}

	return (
		<div className={c.siglas}>{trilha}</div>
	);
}

export default TopoSiglas;

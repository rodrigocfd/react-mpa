import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import c from './TopoSiglas.scss';

interface Props {
	tripaUnids: UnidadeNoArvore[],
}

function TopoSiglas({tripaUnids}: Props) {
	let trilha = '';
	const maxN = 6; // quantidade máxima de níveis hierárquicos a serem exibidos

	if (tripaUnids.length > maxN + 1) { // mais unidades que o máximo, algumas não serão exibidas
		trilha += '... › '
	}

	const inicio = Math.max(1, tripaUnids.length - maxN); // pula "República Federativa do Brasil", que não tem sigla
	for (let i = inicio; i < tripaUnids.length; ++i) {
		trilha += tripaUnids[i].sigla + ' › ';
	}
	trilha = trilha.substr(0, trilha.length - 3);

	if (!trilha.length) { // vazio?
		trilha = '\u00A0'; // &nbsp; pra não colapsar verticalmente a div
	}

	return (
		<div className={c.siglas}>{trilha}</div>
	);
}

export default TopoSiglas;

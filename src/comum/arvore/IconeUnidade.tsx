import React from 'react';

import {TipoUnidade, NivelNormatizacao} from '@dto/UnidadeNoArvore';
import styles from './IconeUnidade.scss';

interface Props {
	chave: TipoUnidade | NivelNormatizacao,
}

/**
 * Ícones que precedem o nome da unidade num nó da árvore.
 */
function IconeUnidade({chave}: Props) {
	let cls = '';
	let lbl = '';

	switch (chave) {
		case 'ET': cls = styles.icoET; lbl = 'Tipo: Ente'; break;
		case 'OR': cls = styles.icoOR; lbl = 'Tipo: Órgão'; break;
		case 'EN': cls = styles.icoEN; lbl = 'Tipo: Entidade'; break;
		case 'UA': cls = styles.icoUA; lbl = 'Tipo: Unidade Administrativa'; break;
		case 'UC': cls = styles.icoUC; lbl = 'Tipo: Unidade Colegiada'; break;
		case 'RE': cls = styles.icoRE; lbl = 'Tipo: Unidade Administrativa com Regulamento Específico'; break;

		case 'LEID': cls = styles.icoLEID; lbl = 'Normatização: Lei/Decreto'; break;
		case 'ATOI': cls = styles.icoATOI; lbl = 'Normatização: Ato Interno';
	}

	return (
		<div className={cls} title={lbl}></div>
	);
}

export default IconeUnidade;

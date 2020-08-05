import React from 'react';

import {EstadoTelaInteira} from './arvoreUtil';
import styles from './BtnTelaInteira.scss';

interface Props {
	estado: EstadoTelaInteira,
	onClick: () => void,
}

/**
 * Botão que puxa a árvore para a tela inteira, ou a restaura de volta.
 */
function BtnTelaInteira(props: Props) {
	const tooltip = (props.estado == EstadoTelaInteira.TelaInteira)
		? 'Restaurar a árvore ao tamanho original'
		: 'Expandir árvore para tela inteira';

	const cssBtn = [
		styles.btn,
		(props.estado == EstadoTelaInteira.TelaInteira
			? styles.restaurar
			: styles.expandir
		)
	].join(' ');

	return (
		<div className={cssBtn} title={tooltip} onClick={props.onClick} />
	);
}

export default BtnTelaInteira;

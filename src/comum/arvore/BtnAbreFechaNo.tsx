import React from 'react'

import {EstadoNo} from './arvoreUtil';
import styles from './BtnAbreFechaNo.scss';

interface Props {
	estado: EstadoNo,
	onClick: () => void,
}

/**
 * Botão +/- que expande ou recolhe um nó da árvore.
 */
function BtnAbreFechaNo({estado, onClick}: Props) {
	function texto() {
		switch (estado) {
			case EstadoNo.Fechado:    return '[+]';
			case EstadoNo.Expandido:  return '[–]';
			case EstadoNo.Carregando: return '[=]';
		}
	}

	return (
		<span onClick={onClick}
			className={styles.btnAbreFecha}>{texto()}</span>
	);
}

export default BtnAbreFechaNo;

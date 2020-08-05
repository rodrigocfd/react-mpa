import React from 'react';

import styles from './Carregando.scss';

interface Props {
	texto?: string,
}

/**
 * Exibe uma animação sinalizando a carga de dados.
 */
function Carregando({texto}: Props) {
	return (
		<span className={styles.wrap}>
			<div className={styles.texto}>{texto || 'Carregando...'}</div>
			<div className={styles.cubo} />
		</span>
	);
}

export default Carregando;

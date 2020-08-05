import React from 'react';

import Conteudo from './Conteudo';
import styles from './MenuLateral.scss';

interface Props {
	releaseSistema: string,
}

/**
 * Menu lateral da aplicação, que fica escondido.
 */
function MenuLateral({releaseSistema}: Props) {
	return (
		<div className={styles.menuLateral}>
			<div className={styles.topo}>
				<div className={styles.cubo}></div>
				<div className={styles.versao}>Versão {releaseSistema}</div>
			</div>
			<Conteudo />
		</div>
	);
}

export default MenuLateral;

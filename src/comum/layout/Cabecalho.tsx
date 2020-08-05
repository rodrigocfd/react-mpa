import React from 'react';

import InfoUsuario from '@dto/InfoUsuario';
import MenuLateral from './menu-lateral/MenuLateral';
import styles from './Cabecalho.scss';

interface Props {
	infoUsuario: InfoUsuario,
}

/**
 * Cabeçalho da aplicação, que aparece em todas as páginas.
 */
function Cabecalho({infoUsuario}: Props) {
	return (
		<div className={styles.header}>
			<div className={styles.logoRow}>
				<div className={styles.left}>
					<div className={styles.hamburger}>
						<MenuLateral releaseSistema={infoUsuario.releaseSistema} />
					</div>
					<div className={styles.logo}></div>
				</div>
				<div className={styles.right}>
					<div>{infoUsuario.nome}</div>
					<div>{infoUsuario.unidadeRaiz.denominacao}</div>
				</div>
			</div>
		</div>
	);
}

export default Cabecalho;

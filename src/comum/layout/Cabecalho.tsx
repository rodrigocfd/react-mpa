import React from 'react';

import InfoUsuario from '@dto/InfoUsuario';
import MenuLateral from './menu-lateral/MenuLateral';
import c from './Cabecalho.scss';

interface Props {
	infoUsuario: InfoUsuario,
}

/**
 * Cabeçalho da aplicação, que aparece em todas as páginas.
 */
function Cabecalho({infoUsuario}: Props) {
	return (
		<div className={c.header}>
			<div className={c.logoRow}>
				<div className={c.left}>
					<div className={c.hamburger}>
						<MenuLateral releaseSistema={infoUsuario.releaseSistema} />
					</div>
					<div className={c.logo}></div>
				</div>
				<div className={c.right}>
					<div>{infoUsuario.nome}</div>
					<div>{infoUsuario.unidadeRaiz.denominacao}</div>
				</div>
			</div>
		</div>
	);
}

export default Cabecalho;

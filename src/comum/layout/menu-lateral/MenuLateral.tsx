import React from 'react';

import Conteudo from './Conteudo';
import c from './MenuLateral.scss';

interface Props {
	releaseSistema: string,
}

/**
 * Menu lateral da aplicação, que fica escondido.
 */
function MenuLateral({releaseSistema}: Props) {
	return (
		<div className={c.menuLateral}>
			<div className={c.topo}>
				<div className={c.cubo}></div>
				<div className={c.versao}>Versão {releaseSistema}</div>
			</div>
			<Conteudo />
		</div>
	);
}

export default MenuLateral;

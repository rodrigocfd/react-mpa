import React from 'react';

import Conteudo from './Conteudo';
import c from './MenuLateral.scss';

/**
 * Menu lateral da aplicação, que fica escondido.
 */
function MenuLateral() {
	return (
		<div className={c.menuLateral}>
			<div className={c.topo}>
				<div className={c.cubo}></div>
			</div>
			<Conteudo />
		</div>
	);
}

export default MenuLateral;

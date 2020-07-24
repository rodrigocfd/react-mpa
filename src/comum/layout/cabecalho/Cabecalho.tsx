import React from 'react';

import Menu from './menu/Menu';
import c from './Cabecalho.scss';

/**
 * Cabeçalho da aplicação, que aparece em todas as páginas.
 */
function Cabecalho() {
	return (
		<div className={c.header}>
			<div className={c.logoRow}>
				<div className={c.left}>
					<div className={c.logo}></div>
				</div>
				<div className={c.right}>
					{/* <UserInfo /> */}
				</div>
			</div>
			<Menu />
		</div>
	);
}

export default Cabecalho;

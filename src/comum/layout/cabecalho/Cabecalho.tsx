import React from 'react';

import MenuLateral from './menu-lateral/MenuLateral';
import c from './Cabecalho.scss';

/**
 * Cabeçalho da aplicação, que aparece em todas as páginas.
 */
function Cabecalho() {
	return (
		<div className={c.header}>
			<div className={c.logoRow}>
				<div className={c.left}>
					<div className={c.hamburger}>
						<MenuLateral />
					</div>
					<div className={c.logo}></div>
				</div>
				<div className={c.right}>
					{/* <UserInfo /> */}
				</div>
			</div>
		</div>
	);
}

export default Cabecalho;

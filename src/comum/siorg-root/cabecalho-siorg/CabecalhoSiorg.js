import React from 'react';

import Menu from './menu/Menu';
// import UserInfo from './UserInfo';
import c from './CabecalhoSiorg.scss';

/**
 * Cabeçalho da aplicação, que aparece em todas as páginas.
 */
function CabecalhoSiorg() {
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

export default CabecalhoSiorg;

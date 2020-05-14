import React from 'react';

import MenuVert1 from './MenuVert1';
import itens from './itens.json';
import c from './Menu.scss';

/**
 * Menu horizontal da aplicação, que aparece em todas as páginas.
 */
function Menu() {
	return (
		<div className={c.menu}>
			<ul className={c.ul}>
				{itens.map(item =>
					<li className={c.li} key={item.label}>
						<div className={c.labelFlex}>
							<div className={c.label}>{item.label}</div>
							<div className={c.arrow}>▼</div>
						</div>
						<MenuVert1 {...item} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Menu;

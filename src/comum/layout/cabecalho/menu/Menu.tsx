import React from 'react';

import {ItemHorz} from './Itens';
import MenuVert1 from './MenuVert1';
import _itens from './itens.json';
import c from './Menu.scss';

const itens = _itens as ItemHorz[];

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
						<MenuVert1 item={item} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Menu;

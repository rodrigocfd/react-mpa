import React from 'react';

import {ItemHorz} from './Itens';
import MenuVert1Entry from './MenuVert1Entry';
import c from './MenuVert1.scss';

interface Props {
	item: ItemHorz,
}

/**
 * Menu vertical de primeiro nível, filho do menu horizontal principal.
 */
function MenuVert1({item}: Props) {
	return (
		<ul className={c.ul}>
			<li className={c.liTitle}>
				<span className={c.spanTitle}>{item.label}</span>
			</li>
			{item.menuVert1.map(item =>
				<MenuVert1Entry key={item.label} item={item} />
			)}
		</ul>
	);
}

export default MenuVert1;

import React from 'react';

import LinkJsf from '@comum/LinkJsf';
import {ItemVert1} from './Itens';
import MenuVert2 from './MenuVert2';
import c from './MenuVert1Entry.scss';

interface Props {
	item: ItemVert1,
}

/**
 * Um único item de menu, do menu vertical de primeiro nível.
 */
function MenuVert1Entry({item}: Props) {
	return (
		<li className={c.li}>
			<div className={c.flexWrap}>
				{item.oldLink
					? <LinkJsf className={c.label} href={item.oldLink}>{item.label}</LinkJsf>
					: <span className={c.label}>{item.label}</span>
				}
				{item.menuVert2 &&
					<div className={c.arrow}>►</div>
				}
			</div>
			{item.menuVert2 &&
				<MenuVert2 itens={item.menuVert2} />
			}
		</li>
	);
}

export default MenuVert1Entry;

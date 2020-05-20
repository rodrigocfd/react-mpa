import React from 'react';

import app from '@src/app';
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
					? <a className={c.label} href={app.montaUrlJsf(item.oldLink)}>{item.label}</a>
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

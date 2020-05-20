import React from 'react';

import app from '@src/app';
import {ItemVert2} from './Itens';
import c from './MenuVert2.scss';

interface Props {
	itens: ItemVert2[],
}

/**
 * Menu vertical de segundo nível, filho do menu vertical de primeiro nível.
 */
function MenuVert2({itens}: Props) {
	return (
		<ul className={c.ul}>
			{itens.map(item =>
				<li key={item.label} className={c.li}>
					{item.oldLink
						? <a className={c.label} href={app.montaUrlJsf(item.oldLink)}>{item.label}</a>
						: <span className={c.label}>{item.label}</span>
					}
				</li>
			)}
		</ul>
	);
}

export default MenuVert2;

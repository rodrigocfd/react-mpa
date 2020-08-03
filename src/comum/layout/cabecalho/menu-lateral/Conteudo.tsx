import React from 'react';

import Link from '@comum/Link';
import {Item} from './Item';
import _itens from './itens.json';
import c from './Conteudo.scss';

const itens = _itens as Item[];

/**
 * Os 3 níveis de menu principal.
 */
function Conteudo() {
	return (
		<ul className={c.menuLevel1}>
			{itens.map(item =>
				<li className={c.item1} key={item.label}>
					{item.menu && <>
						<div className={c.label}>{item.label} ►</div>
						<ul className={c.menuLevel2}>
							{item.menu.map(item =>
								<li className={c.item2} key={item.label}>
									{item.menu && <>
										<div className={c.label}>{item.label} ►</div>
										<ul className={c.menuLevel3}>
											{item.menu.map(item =>
												<li className={c.item3} key={item.label}>
													<Link dest={item.linkApp ? 'app' : 'jsf'}
														href={item.linkApp ? item.linkApp : item.linkJsf}
														className={c.link}>{item.label}</Link>
												</li>
											)}
										</ul>
									</>}
									{!item.menu &&
										<Link dest={item.linkApp ? 'app' : 'jsf'}
											href={item.linkApp ? item.linkApp : item.linkJsf}
											className={c.link}>{item.label}</Link>
									}
								</li>
							)}
						</ul>
					</>}
					{!item.menu &&
						<Link dest={item.linkApp ? 'app' : 'jsf'}
							href={item.linkApp ? item.linkApp : item.linkJsf}
							className={c.link}>{item.label}</Link>
					}
				</li>
			)}
		</ul>
	);
}

export default Conteudo;

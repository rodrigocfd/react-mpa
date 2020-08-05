import React from 'react';

import Link from '@comum/Link';
import {Item} from './Item';
import _itens from './itens.json';
import styles from './Conteudo.scss';

const itens = _itens as Item[];

/**
 * Os 3 níveis de menu principal.
 */
function Conteudo() {
	return (
		<ul className={styles.menuLevel1}>
			{/* Primeiro nível de menu. */}
			{itens.map(item =>
				<li className={styles.item1} key={item.label}>
					{!item.menu && // não é um submenu, é um item clicável
						<Link dest={item.linkApp ? 'app' : 'jsf'}
							href={item.linkApp ? item.linkApp : item.linkJsf}
							className={styles.link}>{item.label}</Link>
					}
					{item.menu && <>
						<div className={styles.label}>{item.label} ►</div>
						<ul className={styles.menuLevel2}>

							{/* Segundo nível de menu. */}
							{item.menu.map(item =>
								<li className={styles.item2} key={item.label}>
									{!item.menu && // não é um submenu, é um item clicável
										<Link dest={item.linkApp ? 'app' : 'jsf'}
											href={item.linkApp ? item.linkApp : item.linkJsf}
											className={styles.link}>{item.label}</Link>
									}
									{item.menu && <>
										<div className={styles.label}>{item.label} ►</div>
										<ul className={styles.menuLevel3}>

											{/* Terceiro nível de menu. */}
											{item.menu.map(item =>
												<li className={styles.item3} key={item.label}>
													<Link dest={item.linkApp ? 'app' : 'jsf'}
														href={item.linkApp ? item.linkApp : item.linkJsf}
														className={styles.link}>{item.label}</Link>
												</li>
											)}

										</ul>
									</>}
								</li>
							)}

						</ul>
					</>}
				</li>
			)}
		</ul>
	);
}

export default Conteudo;

import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import Box from '@comum/Box';
import IconeUnidade from '@comum/arvore/IconeUnidade';
import styles from './Hierarquia.scss';

interface Props {
	hierarquia: UnidadeNoArvore[],
}

function Hierarquia({hierarquia}: Props) {
	return !hierarquia.length ? null : (
		<div className={styles.hierarquia}>
			<Box>
				<h3>Hierarquia</h3>
				{hierarquia.map((un, i) =>
					<div style={{paddingLeft: 7 * i + 'px'}} key={i} className={styles.item}>
						<div className={styles.icones}>
							<IconeUnidade chave={un.tipo} />
							<IconeUnidade chave={un.nivelNormatizacao} />
						</div>
						<div className={styles.nome}>{un.denominacao}</div>
					</div>
				)}
			</Box>
		</div>
	);
}

export default Hierarquia;

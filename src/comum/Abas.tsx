import React from 'react';

import styles from './Abas.scss';

interface Aba {
	titulo: string,
	conteudo: React.ReactNode,
}

interface Props {
	abas: Aba[],
}

/**
 * Container com abas que contém vários subcontainers, mostrando a aba
 * selecionada.
 */
function Abas({abas}: Props) {
	const [sel, setSel] = React.useState(0); // primeira aba selecionada por padrão

	return (
		<div className={styles.wrap}>
			<div className={styles.topoFlex}>
				{abas.map((aba, index) => (
					<span key={aba.titulo + index}
						className={index === sel ? styles.atual : styles.naoAtual}
						onClick={() => setSel(index)}>
							{aba.titulo}
					</span>
				))}
			</div>
			<div className={styles.conteudo}>
				{abas.filter((aba, index) => sel === index)[0].conteudo}
			</div>
		</div>
	);
}

export default Abas;

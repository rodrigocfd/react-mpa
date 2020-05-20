import React from 'react';

import c from './Abas.scss';

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
		<div className={c.wrap}>
			<div className={c.topo}>
				{abas.map((aba, index) => (
					<span key={aba.titulo + index}
						className={index === sel ? c.atual : c.clicavel}
						onClick={() => setSel(index)}>
							{aba.titulo}
					</span>
				))}
			</div>
			<div className={c.conteudo}>
				{abas.filter((aba, index) => sel === index)[0].conteudo}
			</div>
		</div>
	);
}

export default Abas;

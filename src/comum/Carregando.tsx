import React from 'react';

import c from './Carregando.scss';

interface Props {
	texto?: string,
}

/**
 * Exibe uma animação sinalizando a carga de dados.
 */
function Carregando({texto}: Props) {
	return (
		<span className={c.wrap}>
			<div className={c.texto}>{texto || 'Carregando...'}</div>
			<div className={c.cubo} />
		</span>
	);
}

export default Carregando;

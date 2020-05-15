import React from 'react';
import PropTypes from 'prop-types';

import c from './IconeUnidade.scss';

IconeUnidade.propTypes = {
	tipo: PropTypes.string.isRequired
};

/**
 * Ícones que precedem o nome da unidade na árvore.
 */
function IconeUnidade(props) {
	const defs = {
		ET: { ico: c.icoET, lbl: 'Ente' },
		OR: { ico: c.icoOR, lbl: 'Órgão' },
		EN: { ico: c.icoEN, lbl: 'Entidade' },
		UA: { ico: c.icoUA, lbl: 'Unidade Administrativa' },
		UC: { ico: c.icoUC, lbl: 'Unidade Colegiada' },
		RE: { ico: c.icoRE, lbl: 'Unidade Administrativa com Regulamento Específico' },

		LEID: { ico: c.icoLEID, lbl: 'Normatização: Lei/Decreto' },
		ATOI: { ico: c.icoATOI, lbl: 'Normatização: Ato Interno' }
	};

	return (
		<div className={defs[props.tipo].ico}
			title={defs[props.tipo].lbl}></div>
	);
}

export default IconeUnidade;

import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import ArvoreNo from './ArvoreNo';
import c from './Arvore.scss';

Arvore.propTypes = {
	idRaiz: PropTypes.number.isRequired, // ID da unidade a partir da qual a árvore será renderizada
	onClick: PropTypes.func,
	onMouseOver: PropTypes.func
};

/**
 * Árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props) {
	const [unidade, setUnidade] = React.useState({
		raiz: null,
		selecionada: null
	});

	React.useEffect(() => {
		app.serverGet(`/arvore/unidade?id=${props.idRaiz}`)
			.then(unid => setUnidade({raiz: unid, selecionada: unid}));
	}, []);

	function click(unids) {
		setUnidade({...unidade, selecionada: unids[unids.length - 1]}); // seleciona a unidade clicada
		props.onClick && props.onClick(unids);
	}

	return !unidade.raiz ? null : (
		<div className={c.arvore}>
			<ArvoreNo unidade={unidade.raiz} selecionada={unidade.selecionada}
				onClick={click} onMouseOver={props.onMouseOver} />
		</div>
	);
}

export default Arvore;

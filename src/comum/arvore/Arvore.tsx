import React from 'react';

import UnidadeNoArvore from '@src/dto/UnidadeNoArvore';
import ArvoreNo from './ArvoreNo';
import c from './Arvore.scss';

interface Props {
	unidade: UnidadeNoArvore;
	onClick?: (tripaUnidades: UnidadeNoArvore[]) => void;
	onMouseOver?: (tripaUnidades: UnidadeNoArvore[]) => void;
}

/**
 * Árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [unidadeSel, setUnidadeSel] = React.useState({} as UnidadeNoArvore);

	function click(unids: UnidadeNoArvore[]) {
		setUnidadeSel(unids[unids.length - 1]); // seleciona a unidade clicada
		props.onClick && props.onClick(unids);
	}

	return !Object.keys(props.unidade).length ? null : (
		<div className={c.arvore}>
			<ArvoreNo unidade={props.unidade} selecionada={unidadeSel}
				onClick={click} onMouseOver={props.onMouseOver} />
		</div>
	);
}

export default Arvore;

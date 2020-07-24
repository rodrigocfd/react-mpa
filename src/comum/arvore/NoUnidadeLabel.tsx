import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import IconeUnidade from './IconeUnidade';
import c from './NoUnidadeLabel.scss';

interface Props {
	unidade: UnidadeNoArvore,
	ehSel: boolean,
	onClick: () => void,
	onMouseOver: () => void,
}

/**
 * Em um nó da árvore, exibe os ícones e o nome da unidade.
 */
function NoUnidadeLabel(props: Props) {
	return (
		<div className={c.noUnidadeLabelFlex}>
			<div className={c.icones}>
				<IconeUnidade chave={props.unidade.tipo} />
				<IconeUnidade chave={props.unidade.nivelNormatizacao} />
			</div>
			<div className={[c.nome, props.ehSel ? c.nomeSel : ''].join(' ')}
				onClick={props.onClick} onMouseOver={props.onMouseOver}>
					{props.unidade.denominacao}
			</div>
		</div>
	);
}

export default NoUnidadeLabel;

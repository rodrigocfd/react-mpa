import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import IconeUnidade from './IconeUnidade';
import styles from './NoUnidadeLabel.scss';

interface Props {
	unidade: UnidadeNoArvore,
	ehSel: boolean,
	onClick: (divNo: HTMLDivElement | null) => void, // passa DIV clicada
}

/**
 * Em um nó da árvore, exibe os ícones e o nome da unidade.
 */
function NoUnidadeLabel(props: Props) {
	const divNomeRef = React.useRef<HTMLDivElement>(null);

	return (
		<div className={styles.noUnidadeLabelFlex}>
			<div className={styles.icones}>
				<IconeUnidade chave={props.unidade.tipo} />
				<IconeUnidade chave={props.unidade.nivelNormatizacao} />
			</div>
			<div ref={divNomeRef}
				onClick={() => props.onClick(divNomeRef.current)}
				className={[styles.nome, props.ehSel ? styles.nomeSel : ''].join(' ')}>
					{props.unidade.denominacao}
			</div>
		</div>
	);
}

export default NoUnidadeLabel;

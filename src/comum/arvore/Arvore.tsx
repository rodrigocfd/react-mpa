import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import AreaRender from './AreaRender';
import c from './Arvore.scss';

enum Estado { Normal, TelaToda, Encolhendo }

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
	onMouseOverUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Container da árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [estado, setEstado] = React.useState(Estado.Normal);

	function selecionaUnidade(tripaUnidades: UnidadeNoArvore[]) {
		if (estado) toggle(); // selecionar um nó restaura da tela inteira
		props.onSelecionaUnidade && props.onSelecionaUnidade(tripaUnidades);
	}

	function toggle() {
		switch (estado) {
		case Estado.Normal:
			setEstado(Estado.TelaToda);
			break;
		case Estado.TelaToda:
			setEstado(Estado.Encolhendo);
			setTimeout(() => {
				setEstado(Estado.Normal);
			}, 150); // mesma duração da animação que encolhe
		}
	}

	function classe(): string {
		switch (estado) {
			case Estado.Normal:     return c.normal;
			case Estado.TelaToda:   return c.telaToda;
			case Estado.Encolhendo: return c.encolhendo;
		}
	}

	const tit = estado
		? 'Restaurar a árvore ao tamanho original'
		: 'Expandir árvore para tela inteira';

	return (
		<div className={classe()}>
			<AreaRender idSelecionada={props.idSelecionada}
				onSelecionaUnidade={selecionaUnidade} onMouseOverUnidade={props.onMouseOverUnidade} />
			<div className={c.btnFullScreen} onClick={toggle} title={tit}>
				{estado ? '⇱' : '⇲'}
			</div>
		</div>
	);
}

export default Arvore;

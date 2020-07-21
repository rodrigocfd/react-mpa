import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import AreaRender from './AreaRender';
import c from './Arvore.scss';

enum Estado { Normal, TelaInteira, Encolhendo }

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
	onMouseOverUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Container da árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [estado, setEstado] = React.useState(Estado.Normal); // controla árvore expandida para tela inteira

	function selecionaUnidade(tripaUnidades: UnidadeNoArvore[]) {
		if (estado) toggleTelaInteira(); // selecionar um nó restaura da tela inteira
		props.onSelecionaUnidade && props.onSelecionaUnidade(tripaUnidades);
	}

	function toggleTelaInteira() { // botão que expande/retorna árvore tela inteira
		switch (estado) {
		case Estado.Normal:
			setEstado(Estado.TelaInteira);
			break;
		case Estado.TelaInteira:
			setEstado(Estado.Encolhendo); // entra no estado de animação para encolher
			setTimeout(() => {
				setEstado(Estado.Normal); // sai do estado de animação para encolher
			}, 150); // mesma duração da animação que encolhe
		}
	}

	function geraClasseCss(): string { // gera o CSS de acordo com o estado atual
		switch (estado) {
			case Estado.Normal:      return c.normal;
			case Estado.TelaInteira: return c.telaInteira;
			case Estado.Encolhendo:  return c.encolhendo; // animação em curso
		}
	}

	const tit = (estado == Estado.TelaInteira)
		? 'Restaurar a árvore ao tamanho original'
		: 'Expandir árvore para tela inteira';

	return (
		<div className={geraClasseCss()}>
			<AreaRender idSelecionada={props.idSelecionada}
				onSelecionaUnidade={selecionaUnidade} onMouseOverUnidade={props.onMouseOverUnidade} />
			<div className={c.btnFullScreen} onClick={toggleTelaInteira} title={tit}>
				{estado == Estado.TelaInteira ? '⇱' : '⇲'}
			</div>
		</div>
	);
}

export default Arvore;

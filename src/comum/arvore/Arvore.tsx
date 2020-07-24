import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import {EstadoTelaInteira} from './arvoreUtil';
import AreaRender from './AreaRender';
import BtnTelaInteira from './BtnTelaInteira';
import c from './Arvore.scss';

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Container da árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [estado, setEstado] = React.useState(EstadoTelaInteira.Normal); // controla árvore expandida para tela inteira

	function selecionaUnidade(tripaUnidades: UnidadeNoArvore[]) {
		if (estado === EstadoTelaInteira.TelaInteira) {
			toggleTelaInteira(); // selecionar um nó restaura da tela inteira
			setTimeout(() => {
				props.onSelecionaUnidade && props.onSelecionaUnidade(tripaUnidades);
			}, 150); // mesmo tempo de toggleTelaInteira()
		} else {
			props.onSelecionaUnidade && props.onSelecionaUnidade(tripaUnidades);
		}
	}

	function toggleTelaInteira() { // clique no botão que expande/retorna árvore tela inteira
		switch (estado) {
		case EstadoTelaInteira.Normal:
			setEstado(EstadoTelaInteira.TelaInteira);
			break;
		case EstadoTelaInteira.TelaInteira:
			setEstado(EstadoTelaInteira.Encolhendo); // entra no estado de animação para encolher
			setTimeout(() => {
				setEstado(EstadoTelaInteira.Normal); // sai do estado de animação para encolher
			}, 150); // importante: mesma duração da animação que encolhe
		}
	}

	function geraClasseCss(): string { // gera o CSS de acordo com o estado atual
		switch (estado) {
			case EstadoTelaInteira.Normal:      return c.normal;
			case EstadoTelaInteira.TelaInteira: return c.telaInteira;
			case EstadoTelaInteira.Encolhendo:  return c.encolhendo; // animação em curso
		}
	}

	return (
		<div className={[geraClasseCss()].join(' ')}>
			<AreaRender idSelecionada={props.idSelecionada}
				onSelecionaUnidade={selecionaUnidade} />
			<BtnTelaInteira estado={estado} onClick={toggleTelaInteira} />
		</div>
	);
}

export default Arvore;

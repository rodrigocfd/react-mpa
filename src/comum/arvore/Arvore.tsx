import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import arvoreUtil, {EstadoTelaInteira} from './arvoreUtil';
import AreaRender from './AreaRender';
import BtnTelaInteira from './BtnTelaInteira';
import c from './Arvore.scss';

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (hierarquiaSelec: UnidadeNoArvore[]) => void,
}

/**
 * Container da árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [estado, setEstado] = React.useState(EstadoTelaInteira.Normal); // controla árvore expandida para tela inteira

	function selecionouUnidade(hierarquiaSelec: UnidadeNoArvore[]) {
		if (estado === EstadoTelaInteira.TelaInteira) {
			clicouBtnTelaInteira(); // selecionar um nó restaura da tela inteira
			setTimeout(() => {
				props.onSelecionaUnidade && props.onSelecionaUnidade(hierarquiaSelec); // dispara callback
			}, arvoreUtil.tempoAnimacao);
		} else {
			props.onSelecionaUnidade && props.onSelecionaUnidade(hierarquiaSelec); // dispara callback
		}
	}

	function clicouBtnTelaInteira() { // clique no botão que expande/retorna árvore tela inteira
		switch (estado) {
		case EstadoTelaInteira.Normal:
			setEstado(EstadoTelaInteira.TelaInteira);
			break;
		case EstadoTelaInteira.TelaInteira:
			setEstado(EstadoTelaInteira.Encolhendo); // entra no estado de animação para encolher
			setTimeout(() => {
				setEstado(EstadoTelaInteira.Normal); // sai do estado de animação para encolher
			}, arvoreUtil.tempoAnimacao);
		}
	}

	// Classe CSS a ser aplicada na DIV raiz.
	const divCss = {
		[EstadoTelaInteira.Normal]:      c.normal,
		[EstadoTelaInteira.TelaInteira]: c.telaInteira,
		[EstadoTelaInteira.Encolhendo]:  c.encolhendo // animação em curso
	};

	return (<>
		<div className={divCss[estado]}>
			<AreaRender idSelecionada={props.idSelecionada}
				onSelecionaUnidade={selecionouUnidade} />
			<BtnTelaInteira estado={estado} onClick={clicouBtnTelaInteira} />
		</div>
	</>);
}

export default Arvore;

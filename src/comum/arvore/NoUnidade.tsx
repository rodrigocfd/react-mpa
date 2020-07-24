import React from 'react'

import app from '@comum/app';
import Carregando from '@comum/carregando/Carregando';
import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import arvoreUtil, {EstadoNo} from './arvoreUtil';
import BtnAbreFechaNo from './BtnAbreFechaNo';
import NoUnidadeLabel from './NoUnidadeLabel';
import c from './NoUnidade.scss';

interface Props {
	unidade: UnidadeNoArvore, // unidade a ser renderizada neste nó
	selecionada: UnidadeNoArvore, // unidade selecionada na árvore inteira, passado a todos os nós
	onClicaUnidade: (tripaSel: UnidadeNoArvore[], divNo: HTMLDivElement | null) => void,
	onExpandeNo: () => void;
}

/**
 * Um nó da árvore de unidades. Este componente é recursivo.
 */
function NoUnidade(props: Props) {
	const ehSel = props.selecionada && // estamos renderizando a unidade selecionada na árvore?
		(props.selecionada.id === props.unidade.id);
	const ehPaiDaSel = arvoreUtil.ehPaiDaUnidade( // estamos renderizando um dos pais da selecionada?
		props.selecionada, props.unidade);

	// Para que os nós-pai possam estar abertos até o filho, é necessário que
	// os filhos já estejam preenchidos.
	const [estado, setEstado] = React.useState(ehPaiDaSel ? EstadoNo.Aberto : EstadoNo.Fechado);

	function expandeOuFecha() {
		if (estado === EstadoNo.Fechado) { // usuário clicou para abrir
			if (!props.unidade.filhas.length) { // filhas não carregadas ainda
				setEstado(EstadoNo.Carregando);
				app.serverGet(`arvore/filhas?idPai=${props.unidade.id}`)
					.then(filhas => {
						props.unidade.filhas.push(...filhas);
						setEstado(EstadoNo.Aberto);
						props.onExpandeNo();
					});
			} else { // as filhas estão em cache, é só mostrar
				setEstado(EstadoNo.Aberto);
				props.onExpandeNo();
			}
		} else if (estado === EstadoNo.Aberto || estado === EstadoNo.Carregando) { // usuário clicou para fechar
			setEstado(EstadoNo.Fechado);
		}
	}

	function clicouNome(divNo: HTMLDivElement | null) {
		// Envia um array somente com esta unidade.
		// O nó pai vai receber esta notificação em clicouFilha(),
		// e assim a notificação sobre até a raiz.
		props.onClicaUnidade([props.unidade], divNo);
	}

	function clicouFilha(tripaUnidades: UnidadeNoArvore[], divNo: HTMLDivElement | null) {
		// Pega o array de unidades que veio da filha,
		// e insere nossa unidade no início dele.
		props.onClicaUnidade([props.unidade, ...tripaUnidades], divNo);
	}

	return (
		<div className={c.noUnidadeFlex}>
			<div className={c.lateralEsquerda}>
				{props.unidade.temFilhas &&
					<BtnAbreFechaNo estado={estado} onClick={expandeOuFecha} />
				}
			</div>
			<div className={c.dadosUnidade}>
				<NoUnidadeLabel unidade={props.unidade} ehSel={ehSel} onClick={clicouNome} />
				<div className={c.filhas}>
					{estado === EstadoNo.Carregando &&
						<div className={c.carregando}><Carregando /></div>
					}
					{estado === EstadoNo.Aberto && props.unidade.filhas.map(filha =>
						<NoUnidade key={filha.id}
							unidade={filha}
							selecionada={props.selecionada}
							onClicaUnidade={clicouFilha}
							onExpandeNo={props.onExpandeNo} />
					)}
				</div>
			</div>
		</div>
	);
}

export default NoUnidade;

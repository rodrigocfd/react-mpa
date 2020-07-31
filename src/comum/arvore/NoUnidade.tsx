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
	hierarquiaSelec: UnidadeNoArvore[], // hierarquia até à unidade selecionada, repassada a todos os filhos
	onClicaUnidade: (
		hierarquiaSelec: UnidadeNoArvore[],
		divNo: HTMLDivElement | null)
		=> void,
	onExpandeNo: () => void;
}

/**
 * Um nó da árvore de unidades. Este componente é recursivo.
 */
function NoUnidade(props: Props) {
	// Se a selecionada é nossa filha, então este nó tem que estar expandido.
	const [estado, setEstado] = React.useState(
		arvoreUtil.ehPaiDaSelec(props.unidade, props.hierarquiaSelec)
			? EstadoNo.Expandido
			: EstadoNo.Fechado
	);

	function expandeOuFecha() {
		if (estado === EstadoNo.Fechado) { // usuário clicou para expandir este nó
			if (!props.unidade.filhas.length) { // unidades filhas não foram carregadas ainda
				setEstado(EstadoNo.Carregando);
				app.serverGet(`arvore/filhas?idPai=${props.unidade.id}`) // consulta as filhas
					.then(filhas => {
						props.unidade.filhas.push(...filhas); // guarda as filhas
						setEstado(EstadoNo.Expandido);
						props.onExpandeNo(); // dispara callback
					});
			} else { // as filhas já estão em cache, é só mostrar
				setEstado(EstadoNo.Expandido);
				props.onExpandeNo();
			}
		} else if (estado === EstadoNo.Expandido || estado === EstadoNo.Carregando) { // usuário clicou para fechar este nó
			setEstado(EstadoNo.Fechado);
		}
	}

	function clicouNome(divNo: HTMLDivElement | null) {
		// Envia um array, que inicialmente só tem esta unidade.
		// O nó pai vai receber esta notificação em clicouFilha(), e vai adicionar a si mesmo.
		// Assim a notificação sobre até a raiz, onde será um array com a hierarquia toda.
		props.onClicaUnidade([props.unidade], divNo); // dispara callback
	}

	function clicouFilha(hierarquiaSelec: UnidadeNoArvore[], divNo: HTMLDivElement | null) {
		// Pega o array de unidades que veio da filha,
		// e insere esta unidade no início dele.
		props.onClicaUnidade([props.unidade, ...hierarquiaSelec], divNo); // dispara callback
	}

	return (
		<div className={c.noUnidadeFlex}>
			<div className={c.lateralEsquerda}>
				{props.unidade.temFilhas &&
					<BtnAbreFechaNo estado={estado} onClick={expandeOuFecha} />
				}
			</div>
			<div className={c.dadosUnidade}>
				<NoUnidadeLabel unidade={props.unidade} onClick={clicouNome}
					ehSel={arvoreUtil.ehSelec(props.unidade, props.hierarquiaSelec)} />
				<div className={c.filhas}>
					{estado === EstadoNo.Carregando &&
						<div className={c.carregando}><Carregando /></div>
					}
					{estado === EstadoNo.Expandido && props.unidade.filhas.map(filha =>
						<NoUnidade key={filha.id}
							unidade={filha}
							hierarquiaSelec={props.hierarquiaSelec}
							onClicaUnidade={clicouFilha}
							onExpandeNo={props.onExpandeNo} />
					)}
				</div>
			</div>
		</div>
	);
}

export default NoUnidade;

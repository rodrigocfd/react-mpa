import React from 'react'

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@src/app';
import Carregando from '@src/comum/carregando/Carregando';
import arvoreUtil, {EstadoNo} from './arvoreUtil';
import BtnAbreFechaNo from './BtnAbreFechaNo';
import IconeUnidade from './IconeUnidade';
import c from './NoUnidade.scss';

interface Props {
	unidade: UnidadeNoArvore,
	selecionada: UnidadeNoArvore,
	onClicaUnidade: (tripaSel: UnidadeNoArvore[]) => void,
	onMouseOverUnidade: (tripaMouseOver: UnidadeNoArvore[]) => void,
	onAbreNo: () => void;
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

	function abreFecha() {
		if (estado === EstadoNo.Fechado) { // usuário clicou para abrir
			if (!props.unidade.filhas.length) { // filhas não carregadas ainda
				setEstado(EstadoNo.Carregando);
				app.serverGet(`arvore/filhas?idPai=${props.unidade.id}`)
					.then(filhas => {
						props.unidade.filhas.push(...filhas);
						setEstado(EstadoNo.Aberto);
						props.onAbreNo();
					});
			} else {
				setEstado(EstadoNo.Aberto); // as filhas estão em cache, é só mostrar
				props.onAbreNo();
			}
		} else if (estado === EstadoNo.Aberto || estado === EstadoNo.Carregando) { // usuário clicou para fechar
			setEstado(EstadoNo.Fechado);
		}
	}

	function clickNome() {
		props.onClicaUnidade([props.unidade]); // envia um array somente com esta unidade
	}
	function mouseOverNome() {
		props.onMouseOverUnidade && props.onMouseOverUnidade([props.unidade]);
	}

	function clickFilha(tripaUnidades: UnidadeNoArvore[]) {
		props.onClicaUnidade([props.unidade, ...tripaUnidades]); // insere a unidade atual no início do array
	}
	function mouseOverFilha(tripaUnidades: UnidadeNoArvore[]) {
		props.onMouseOverUnidade && props.onMouseOverUnidade([props.unidade, ...tripaUnidades]);
	}

	return (
		<div className={c.arvoreNo}>
			<div className={c.barraEsquerda}>
				{props.unidade.temFilhas &&
					<BtnAbreFechaNo estado={estado} onClick={abreFecha} />
				}
			</div>
			<div className={c.dadosUnidade}>
				<div className={c.iconesComNome}>
					<div className={c.icones}>
						<IconeUnidade chave={props.unidade.tipo} />
						<IconeUnidade chave={props.unidade.nivelNormatizacao} />
					</div>
					<div className={[c.nomeUnidade, ehSel ? c.nomeUnidadeSel : ''].join(' ')}
						onClick={clickNome} onMouseOver={mouseOverNome}>
							{props.unidade.denominacao}
					</div>
				</div>
				<div className={c.filhas}>
					{estado === EstadoNo.Carregando &&
						<div className={c.carregando}><Carregando /></div>
					}
					{estado === EstadoNo.Aberto && props.unidade.filhas.map(filha =>
						<NoUnidade key={filha.id} unidade={filha} selecionada={props.selecionada}
							onClicaUnidade={clickFilha} onMouseOverUnidade={mouseOverFilha}
							onAbreNo={props.onAbreNo} />
					)}
				</div>
			</div>
		</div>
	);
}

export default NoUnidade;

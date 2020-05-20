import React from 'react'

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@src/app';
import BtnAbreFecha from './BtnAbreFecha';
import EstadoNo from './EstadoNo';
import IconeUnidade from './IconeUnidade';
import c from './ArvoreNo.scss';

interface Props {
	unidade: UnidadeNoArvore,
	selecionada: UnidadeNoArvore,
	onClick?: (tripaUnidades: UnidadeNoArvore[]) => void,
	onMouseOver?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Um nó da árvore de unidades. Este componente é recursivo.
 */
function ArvoreNo(props: Props) {
	const [estado, setEstado] = React.useState(EstadoNo.Fechado);

	const ehSel = props.selecionada && // estamos renderizando a unidade selecionada na árvore?
		(props.selecionada.id === props.unidade.id);

	function abreFecha() {
		if (estado === EstadoNo.Fechado) { // usuário clicou para abrir
			if (!props.unidade.filhas.length) { // filhas não carregadas ainda
				setEstado(EstadoNo.Carregando);
				app.serverGet(`/arvore/filhas?idPai=${props.unidade.id}`)
					.then(filhas => {
						props.unidade.filhas.push(...filhas);
						setEstado(EstadoNo.Aberto);
					});
			} else {
				setEstado(EstadoNo.Aberto); // as filhas estão em cache, é só mostrar
			}
		} else if (estado === EstadoNo.Aberto || estado === EstadoNo.Carregando) { // usuário clicou para fechar
			setEstado(EstadoNo.Fechado);
		}
	}

	function clickNome() {
		props.onClick && props.onClick([props.unidade]); // envia um array somente com esta unidade
	}
	function mouseOverNome() {
		props.onMouseOver && props.onMouseOver([props.unidade]);
	}

	function clickFilha(tripaUnidades: UnidadeNoArvore[]) {
		props.onClick && props.onClick([props.unidade, ...tripaUnidades]); // insere a unidade atual no início do array
	}
	function mouseOverFilha(tripaUnidades: UnidadeNoArvore[]) {
		props.onMouseOver && props.onMouseOver([props.unidade, ...tripaUnidades]);
	}

	return (
		<div className={c.arvoreNo}>
			<div className={c.barraEsquerda}>
				{props.unidade.temFilhas &&
					<BtnAbreFecha estado={estado} onClick={abreFecha} />
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
						<div className={c.carregando}>Carregando...</div>
					}
					{estado === EstadoNo.Aberto && props.unidade.filhas.map(filha =>
						<ArvoreNo key={filha.id} unidade={filha} selecionada={props.selecionada}
							onClick={clickFilha} onMouseOver={mouseOverFilha} />
					)}
				</div>
			</div>
		</div>
	);
}

export default ArvoreNo;

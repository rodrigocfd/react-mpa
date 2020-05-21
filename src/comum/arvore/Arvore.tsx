import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@src/app';
import Carregando from '@src/comum/carregando/Carregando';
import ArvoreNo from './ArvoreNo';
import TopoSiglas from './TopoSiglas';
import arvoreUtil from './arvoreUtil';
import c from './Arvore.scss';

interface Props {
	idSelecionada: number,
	onClick?: (tripaUnidades: UnidadeNoArvore[]) => void,
	onMouseOver?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Árvore que mostra as unidades do Siorg de forma hierárquica.
 */
function Arvore(props: Props) {
	const [arvore, setArvore] = React.useState({
		raiz: {} as UnidadeNoArvore,
		selecionada: {} as UnidadeNoArvore,
	});
	const [tripaUnids, setTripaUnids] = React.useState([] as UnidadeNoArvore[]); // setada no onMouseOver

	React.useEffect(() => {
		app.serverGet(`/arvore/hierarquiaAcima?id=${props.idSelecionada}`)
			.then((unidRaiz: UnidadeNoArvore) => {
				const unidSel = arvoreUtil.achaSelecionada(unidRaiz, props.idSelecionada);
				if (unidSel === null) {
					alert('Erro: a unidade seleciona não faz parte da árvore pesquisada.');
				} else {
					setArvore({raiz: unidRaiz, selecionada: unidSel});
				}
			});
	}, []);

	function click(tripaUnids: UnidadeNoArvore[]) {
		setArvore({...arvore, selecionada: tripaUnids[tripaUnids.length - 1]}); // seleciona a unidade clicada
		props.onClick && props.onClick(tripaUnids);
	}

	function mouseOver(tripaUnids: UnidadeNoArvore[]) {
		setTripaUnids(tripaUnids); // mostra trilha de unidades no topo da árvore ao passar com o cursor
		props.onMouseOver && props.onMouseOver(tripaUnids);
	}

	return (
		<div className={c.arvoreFlex}>
			<div className={c.topo}>
				<TopoSiglas tripaUnids={tripaUnids} />
			</div>
			<div className={c.nosDaArvore} onMouseLeave={() => setTripaUnids([])}>
				{app.isEmpty(arvore.raiz) &&
					<div className={c.carregando}><Carregando texto="Carregando árvore..." /></div>
				}
				{!app.isEmpty(arvore.raiz) &&
					<ArvoreNo unidade={arvore.raiz} selecionada={arvore.selecionada}
						onClick={click} onMouseOver={mouseOver} />
				}
			</div>
		</div>
	);
}

export default Arvore;

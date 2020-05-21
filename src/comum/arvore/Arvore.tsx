import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@src/app';
import Carregando from '@src/comum/carregando/Carregando';
import ArvoreNo from './ArvoreNo';
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

	function click(unids: UnidadeNoArvore[]) {
		setArvore({...arvore, selecionada: unids[unids.length - 1]}); // seleciona a unidade clicada
		props.onClick && props.onClick(unids);
	}

	return (
		<div className={c.arvore}>
			{app.isEmpty(arvore.raiz) &&
				<div className={c.carregando}><Carregando texto="Carregando árvore..." /></div>
			}
			{!app.isEmpty(arvore.raiz) &&
				<ArvoreNo unidade={arvore.raiz} selecionada={arvore.selecionada}
					onClick={click} onMouseOver={props.onMouseOver} />
			}
		</div>
	);
}

export default Arvore;

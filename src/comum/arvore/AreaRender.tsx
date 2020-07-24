import React from 'react';

import app from '@comum/app';
import Carregando from '@comum/carregando/Carregando';
import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import NoUnidade from './NoUnidade';
import TopoSiglas from './TopoSiglas';
import arvoreUtil from './arvoreUtil';
import c from './AreaRender.scss';

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
	onMouseOverUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Renderiza a árvore.
 */
function AreaRender(props: Props) {
	const divScrollRef = React.useRef<HTMLDivElement>(null);
	const [arvore, setArvore] = React.useState({
		raiz: {} as UnidadeNoArvore,
		tripaSel: [] as UnidadeNoArvore[], // tripa com a hierarquia, a última unidade no array é a selecionada
		tripaTopo: [] as UnidadeNoArvore[], // siglas que aparecem no topo da árvore ao passar com o cursor
	});

	React.useEffect(() => {
		app.serverGet(`arvore/hierarquiaAcima?id=${props.idSelecionada}`)
			.then((raiz: UnidadeNoArvore) => {
				const tripaSel = arvoreUtil.montaHierarquiaTripa(raiz, props.idSelecionada);
				if (tripaSel.length === 0) {
					alert('Erro: a unidade selecionada não faz parte da árvore pesquisada.');
				} else {
					setArvore({raiz, tripaSel, tripaTopo: tripaSel}); // sem passar com o cursor, o topo mostra a selecionada
				}
			});
	}, []);

	function clicouUnidade(tripaSel: UnidadeNoArvore[]) {
		setArvore({...arvore, tripaSel}); // seleciona a unidade clicada
		setTimeout(() => {
			abreNo(); // força scroll para a direita.
		}, 160); // duração maior que a animação que encolhe
		props.onSelecionaUnidade && props.onSelecionaUnidade(tripaSel);
	}

	function mouseOver(tripaMouseOver: UnidadeNoArvore[]) {
		setArvore({...arvore, tripaTopo: tripaMouseOver}); // mostra trilha de unidades no topo da árvore ao passar com o cursor
		props.onMouseOverUnidade && props.onMouseOverUnidade(tripaMouseOver);
	}

	function abreNo() { // quando um nó é expandido
		if (divScrollRef.current) {
			const el = divScrollRef.current;
			el.scrollLeft = el.scrollWidth - el.clientWidth; // força scroll para a direita
		}
	}

	return (
		<div className={c.arvoreFlex}>
			<div className={c.topo}>
				<TopoSiglas tripaUnids={arvore.tripaTopo} />
			</div>
			<div className={c.nosDaArvore} ref={divScrollRef}
				onMouseLeave={() => setArvore({...arvore, tripaTopo: arvore.tripaSel})}>
					{app.isEmpty(arvore.raiz) &&
						<div className={c.carregando}><Carregando texto="Carregando árvore..." /></div>
					}
					{!app.isEmpty(arvore.raiz) &&
						<NoUnidade unidade={arvore.raiz} selecionada={arvore.tripaSel[arvore.tripaSel.length - 1]}
							onClicaUnidade={clicouUnidade} onMouseOverUnidade={mouseOver} onAbreNo={abreNo} />
					}
			</div>
		</div>
	);
}

export default AreaRender;

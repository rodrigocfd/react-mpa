import React from 'react';

import app from '@comum/app';
import Carregando from '@comum/carregando/Carregando';
import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import NoUnidade from './NoUnidade';
import arvoreUtil from './arvoreUtil';
import c from './AreaRender.scss';

interface Props {
	idSelecionada: number,
	onSelecionaUnidade?: (tripaUnidades: UnidadeNoArvore[]) => void,
}

/**
 * Renderiza o nó raiz da árvore.
 */
function AreaRender(props: Props) {
	const divScrollRef = React.useRef<HTMLDivElement>(null);
	const [arvore, setArvore] = React.useState({
		raiz: {} as UnidadeNoArvore,
		tripaSel: [] as UnidadeNoArvore[], // tripa com a hierarquia, a última unidade no array é a selecionada
	});

	React.useEffect(() => {
		app.serverGet(`arvore/hierarquiaAcima?id=${props.idSelecionada}`) // consulta esta unidade e todos os pais
			.then((raiz: UnidadeNoArvore) => {
				const tripaSel = arvoreUtil.montaHierarquiaTripa(raiz, props.idSelecionada);
				if (tripaSel.length === 0) {
					alert('Erro: a unidade selecionada não faz parte da árvore pesquisada.');
				} else {
					setArvore({raiz, tripaSel}); // sem passar com o cursor, o topo mostra a selecionada
				}
			});
	}, []);

	function clicouUnidade(tripaSel: UnidadeNoArvore[], divNo: HTMLDivElement | null) {
		setArvore({...arvore, tripaSel}); // seleciona a unidade clicada
		setTimeout(() => {
			scrollParaDireita();
			centralizaNoVerticalmente(divNo);
		}, arvoreUtil.tempoAnimacao + 10); // duração maior que a animação que restaura a árvore da tela inteira
		props.onSelecionaUnidade && props.onSelecionaUnidade(tripaSel);
	}

	function scrollParaDireita() { // quando um nó é expandido
		if (divScrollRef.current) {
			const el = divScrollRef.current;
			el.scrollLeft = el.scrollWidth - el.clientWidth; // força scroll para a direita
		}
	}

	function centralizaNoVerticalmente(divNo: HTMLDivElement | null) { // quando um nó é clicado na tela inteira
		if (divScrollRef.current && divNo) {
			const el = divScrollRef.current;
			el.scrollTop = divNo.offsetTop - el.clientHeight / 2 + 24; // esse +24 compensa a altura do próprio nó
		}
	}

	return (
		<div className={c.areaRenderFlex}>
			<div className={c.nosDaArvore} ref={divScrollRef}>
					{app.isEmpty(arvore.raiz) &&
						<div className={c.carregando}><Carregando texto="Carregando árvore..." /></div>
					}
					{!app.isEmpty(arvore.raiz) &&
						<NoUnidade unidade={arvore.raiz}
							selecionada={arvore.tripaSel[arvore.tripaSel.length - 1]}
							onClicaUnidade={clicouUnidade}
							onExpandeNo={scrollParaDireita} />
					}
			</div>
		</div>
	);
}

export default AreaRender;

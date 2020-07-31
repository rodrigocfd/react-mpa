import React from 'react';

import app from '@comum/app';
import Carregando from '@comum/carregando/Carregando';
import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import NoUnidade from './NoUnidade';
import arvoreUtil from './arvoreUtil';
import c from './AreaRender.scss';

interface Props {
	idSelecionada: number,
	onSelecionaUnidade: (hierarquiaSelec: UnidadeNoArvore[]) => void,
}

/**
 * Renderiza o nó raiz da árvore, e guarda os dados vindos do servidor.
 */
function AreaRender(props: Props) {
	const divScrollRef = React.useRef<HTMLDivElement>(null);
	const [arvore, setArvore] = React.useState({
		// O nó raiz guarda toda a hierarquia de nós da árvore.
		raiz: {} as UnidadeNoArvore,
		// Nó atualmente selecionado na árvore.
		// É um array com a hierarquia da raiz até o nó selecionado.
		// Passado a todos os nós filhos.
		hierarquiaSelec: [] as UnidadeNoArvore[],
	});

	React.useEffect(() => {
		app.serverGet(`arvore/hierarquiaAcima?id=${props.idSelecionada}`) // consulta esta unidade e todos os pais
			.then((raiz: UnidadeNoArvore) => {
				const hierarquiaSelec = arvoreUtil.montaHierarquiaFlat(raiz, props.idSelecionada);
				if (hierarquiaSelec.length === 0) {
					alert('Erro: a unidade selecionada não faz parte da árvore pesquisada.');
				} else {
					setArvore({raiz, hierarquiaSelec});
				}
			});
	}, []);

	function clicouUnidade(
		hierarquiaSelec: UnidadeNoArvore[],
		divNo: HTMLDivElement | null)
	{
		setArvore({...arvore, hierarquiaSelec}); // a unidade clicada é a nova selecionada
		setTimeout(() => {
			scrollParaDireita();
			centralizaNoVerticalmente(divNo);
		}, arvoreUtil.tempoAnimacao + 10); // duração maior que a animação que restaura a árvore da tela inteira

		props.onSelecionaUnidade(hierarquiaSelec); // dispara callback
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
							hierarquiaSelec={arvore.hierarquiaSelec}
							onClicaUnidade={clicouUnidade}
							onExpandeNo={scrollParaDireita} />
					}
			</div>
		</div>
	);
}

export default AreaRender;

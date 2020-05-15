import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import IconeUnidade from './IconeUnidade';
import PTUnidade from './PTUnidade';
import c from './ArvoreNo.scss';

ArvoreNo.propTypes = {
	unidade: PTUnidade.isRequired, // unidade que será renderizada neste nó
	onClick: PropTypes.func, // onClick([hierarquiaUnidades])
	onMouseOver: PropTypes.func // onMouseOver([hierarquiaUnidades])
};

/**
 * Um nó da árvore de unidades. Este componente é recursivo.
 */
function ArvoreNo(props) {
	const [estado, setEstado] = React.useState('FECHADA'); // 'ABERTA', 'CARREGANDO'

	const btnMaisMenos = {
		FECHADA: '[+]',
		ABERTA: '[–]',
		CARREGANDO: '[=]'
	};

	function abreFecha() {
		if (estado === 'FECHADA') { // usuário clicou para abrir
			if (!props.unidade.filhas.length) { // filhas não carregadas ainda
				setEstado('CARREGANDO');
				app.serverGet(`/arvore/filhas?idPai=${props.unidade.id}`)
					.then(filhas => {
						props.unidade.filhas.push(...filhas);
						setEstado('ABERTA');
					});
			} else {
				setEstado('ABERTA'); // as filhas estão em cache, é só mostrar
			}
		} else if (estado === 'ABERTA' || estado === 'CARREGANDO') { // usuário clicou para fechar
			setEstado('FECHADA');
		}
	}

	function clickNome() {
		props.onClick && props.onClick([props.unidade]); // envia a hierarquia de unidades no callback
	}
	function mouseOverNome() {
		props.onMouseOver && props.onMouseOver([props.unidade]);
	}

	function clickFilha(tripaUnidades) {
		props.onClick && props.onClick([props.unidade, ...tripaUnidades]);
	}
	function mouseOverFilha(tripaUnidades) {
		props.onMouseOver && props.onMouseOver([props.unidade, ...tripaUnidades]);
	}

	return (
		<div className={c.arvoreNo}>
			<div className={c.barraEsquerda}>
				{props.unidade.temFilhas &&
					<span onClick={abreFecha} className={c.btnAbre}>
						{btnMaisMenos[estado]}
					</span>
				}
			</div>
			<div className={c.dadosUnidade}>
				<div className={c.iconesComNome}>
					<div className={c.icones}>
						<IconeUnidade tipo={props.unidade.tipo} />
						<IconeUnidade tipo={props.unidade.nivelNormatizacao} />
					</div>
					<div className={c.nomeUnidade} onClick={clickNome} onMouseOver={mouseOverNome}>
						{props.unidade.denominacao}
					</div>
				</div>
				<div className={c.filhas}>
					{estado === 'CARREGANDO' &&
						<div className={c.carregando}>Carregando...</div>
					}
					{estado === 'ABERTA' && props.unidade.filhas.map(filha =>
						<ArvoreNo key={filha.id} unidade={filha}
							onClick={clickFilha} onMouseOver={mouseOverFilha} />
					)}
				</div>
			</div>
		</div>
	);
}

export default ArvoreNo;

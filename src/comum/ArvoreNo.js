import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import IconeUnidade from './IconeUnidade';
import c from './ArvoreNo.scss';

function ArvoreNo(props) {
	const [estado, setEstado] = React.useState('FECHADA');

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
		} else if (estado === 'ABERTA') { // usuário clicou para fechar
			setEstado('FECHADA');
		}
	}

	function click() {
		props.onClick && props.onClick([props.unidade]); // envia a hierarquia de unidades no callback
	}
	function mouseOver() {
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
						{estado === 'ABERTA' ? '[–]' : '[+]'}
					</span>
				}
			</div>
			<div className={c.dadosUnidade}>
				<div className={c.iconeNome}>
					<div className={c.icone}><IconeUnidade tipo={props.unidade.tipo} /></div>
					<div className={c.nomeUnidade} onClick={click} onMouseOver={mouseOver}>
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

ArvoreNo.propTypes = {
	unidade: PropTypes.shape({
		id: PropTypes.number.isRequired,
		codigo: PropTypes.number.isRequired,
		denominacao: PropTypes.string.isRequired,
		sigla: PropTypes.string.isRequired,
		tipo: PropTypes.string.isRequired,
		idPai: PropTypes.number,
		temFilhas: PropTypes.bool.isRequired,
		filhas: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired,
	onClick: PropTypes.func, // onClick([hierarquiaUnidades])
	onMouseOver: PropTypes.func
};

export default ArvoreNo;

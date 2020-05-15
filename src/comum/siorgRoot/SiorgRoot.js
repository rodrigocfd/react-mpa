import React from 'react';
import PropTypes from 'prop-types';

import app, {AppContext} from 'src/app';
import CabecalhoSiorg from './cabecalhoSiorg/CabecalhoSiorg';
import CuboFundo from './CuboFundo';
import c from './SiorgRoot.scss';
import _ from './global.scss'; // insere CSS global da aplicação

/**
 * Componente de topo da aplicação.
 * Faz a primeira consulta para verificar se o usuário está autenticado.
 */
function SiorgRoot(props) {
	const [rootContext, setRootContext] = React.useState({ // vai ser passado para AppContext.Provider
		estado: 'CARREGANDO', // 'LOGADO', 'ERRO'
		msgErro: '',
		infoUsuario: null // informações da sessão do Siorg
	});

	React.useEffect(() => {
		if (rootContext.estado === 'CARREGANDO') {
			app.serverGet('sessao/infoUsuario', undefined, true) // requisita informações sobre o usuário atual
				.then(dados => { // usuário está logado
					setRootContext({
						estado: 'LOGADO',
						msgErro: '',
						infoUsuario: dados // guarda as informações do usuário
					});
				})
				.catch(err => { // usuário não está logado
					setRootContext({
						estado: 'ERRO',
						msgErro: err.message,
						infoUsuario: null
					});
				});
		}
	}, []);

	switch (rootContext.estado) {
	case 'CARREGANDO':
		return (
			<div className={c.naoCarregado}>
				<div>Carregando...</div>
				<CuboFundo />
			</div>
		);
	case 'ERRO':
		return (
			<div className={c.naoCarregado}>
				<div>Você não está logado.</div>
				<div>{rootContext.msgErro}</div>
				<div><a href={app.montaUrlJsf('index.jsf')}>Fazer login</a></div>
				<CuboFundo />
			</div>
		);
	case 'LOGADO': // carrega a aplicação normalmente
		return (
			<AppContext.Provider value={[rootContext, setRootContext]}>
				<CabecalhoSiorg />
				<div className={c.conteudoNormal}>
					{props.children}
				</div>
				<CuboFundo />
			</AppContext.Provider>
		);
	default:
		return null;
	}
}

SiorgRoot.propTypes = {
	children: PropTypes.node.isRequired
};

export default SiorgRoot;

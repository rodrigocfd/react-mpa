import React from 'react';
import PropTypes from 'prop-types';

import app, {AppContext} from 'src/app';
import CabecalhoSiorg from './cabecalho-siorg/CabecalhoSiorg';
import CuboFundo from './CuboFundo';
import c from './SiorgRoot.scss';
import _ from './global.scss'; // insere CSS global da aplicação

/**
 * Componente de topo da aplicação.
 * Faz a primeira consulta para verificar se o usuário está autenticado.
 */
function SiorgRoot(props) {
	const [rootContext, setRootContext] = React.useState({ // contexto global da aplicação
		infoUsuario: null,
		estado: 'CARREGANDO'
	});

	React.useEffect(() => {
		if (rootContext.estado === 'CARREGANDO') {
			app.serverGet('sessao/infoUsuario') // requisita informações sobre o usuário atual
				.then(dados => { // usuário está logado
					setRootContext({
						...rootContext,
						estado: 'LOGADO',
						infoUsuario: dados // guarda as informações do usuário
					});
				})
				.catch(err => { // usuário não está logado
					setRootContext({
						...rootContext,
						estado: 'NAO-LOGADO'
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
	case 'NAO-LOGADO':
		return (
			<div className={c.naoCarregado}>
				<div>Você não está logado.</div>
				<div><a href={app.montaUrlJsf('index.jsf')}>Fazer login</a></div>
				<CuboFundo />
			</div>
		);
	case 'LOGADO':
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

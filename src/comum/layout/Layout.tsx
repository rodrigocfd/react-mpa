import React from 'react';

import app, {AppContext, EstadoAplicacao} from '@comum/app';
import Link from '@comum/Link';
import Carregando from '@comum/carregando/Carregando';
import InfoUsuario from '@dto/InfoUsuario';
import Cabecalho from './cabecalho/Cabecalho';
import CuboFundo from './CuboFundo';
import c from './Layout.scss';

interface Props {
	children: React.ReactNode,
}

/**
 * Componente de topo da aplicação.
 * Faz a primeira consulta para verificar se o usuário está autenticado.
 */
function Layout({children}: Props) {
	const [rootContext, setRootContext] = React.useState({ // vai ser passado para AppContext.Provider
		estado: EstadoAplicacao.Carregando,
		msgErro: '', // exibida por este componente
		infoUsuario: {} as InfoUsuario, // informações da sessão do Siorg
	});

	React.useEffect(() => {
		if (rootContext.estado === EstadoAplicacao.Carregando) {
			app.serverGet('sessao/infoUsuario', {}, false) // requisita informações sobre o usuário atual
				.then((dados: InfoUsuario) => { // usuário está logado
					setRootContext({
						estado: EstadoAplicacao.Logado,
						msgErro: '',
						infoUsuario: dados, // guarda as informações do usuário
					});
				})
				.catch((err: any) => { // usuário não está logado
					setRootContext({
						estado: EstadoAplicacao.Erro,
						msgErro: err.message,
						infoUsuario: {} as InfoUsuario,
					});
				});
		}
	}, []);

	switch (rootContext.estado) {
	case EstadoAplicacao.Carregando:
		return (
			<div className={c.naoCarregado}>
				<Carregando />
				<CuboFundo gira />
			</div>
		);
	case EstadoAplicacao.Erro:
		return (
			<div className={c.naoCarregado}>
				<div>{rootContext.msgErro}</div>
				<div><Link dest="jsf" href="index.jsf">Ir para a página de login</Link></div>
				<CuboFundo gira />
			</div>
		);
	case EstadoAplicacao.Logado: // carrega a aplicação normalmente
		return (
			<AppContext.Provider value={[rootContext, setRootContext]}>
				<Cabecalho />
				<div className={c.conteudoNormal}>
					{children}
				</div>
				<CuboFundo />
			</AppContext.Provider>
		);
	default:
		return null;
	}
}

export default Layout;

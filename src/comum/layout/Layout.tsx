import React from 'react';

import app from '@comum/app';
import Link from '@comum/Link';
import Carregando from '@comum/Carregando';
import InfoUsuario from '@dto/InfoUsuario';
import Cabecalho from './Cabecalho';
import CuboFundo from './CuboFundo';
import c from './Layout.scss';

enum StatusApp { Carregando, Logado, Erro }

interface Estado { // conteúdo do React.useState() neste componente
	statusApp: StatusApp,
	msgErro: string,
	infoUsuario: InfoUsuario,
}

interface Props {
	children: React.ReactNode,
}

/**
 * Componente de topo da aplicação.
 * Faz a primeira consulta para verificar se o usuário está autenticado.
 */
function Layout({children}: Props) {
	const [estado, setEstado] = React.useState({
		statusApp: StatusApp.Carregando, // inicialmente carregando
		msgErro: '',
		infoUsuario: {}, // informações da sessão do Siorg
	} as Estado);

	React.useEffect(() => {
		if (estado.statusApp === StatusApp.Carregando) {
			app.serverGet('sessao/infoUsuario', {}, false) // requisita informações sobre o usuário atual
				.then((dados: InfoUsuario) => { // usuário está logado
					setEstado({
						statusApp: StatusApp.Logado,
						msgErro: '',
						infoUsuario: dados, // guarda as informações do usuário
					});
				})
				.catch((err: any) => { // usuário não está logado
					setEstado({
						statusApp: StatusApp.Erro,
						msgErro: err.message,
						infoUsuario: {} as InfoUsuario,
					});
				});
		}
	}, []);

	switch (estado.statusApp) {
	case StatusApp.Carregando:
		return (
			<div className={c.naoCarregado}>
				<Carregando />
				<CuboFundo gira />
			</div>
		);
	case StatusApp.Erro:
		return (
			<div className={c.naoCarregado}>
				<div>{estado.msgErro}</div>
				<div><Link dest="jsf" href="index.jsf">Ir para a página de login</Link></div>
				<CuboFundo gira />
			</div>
		);
	case StatusApp.Logado: // carrega a aplicação normalmente
		return (<>
			<Cabecalho infoUsuario={estado.infoUsuario} />
			<div className={c.conteudoNormal}>
				{children}
			</div>
			<CuboFundo />
		</>);
	default:
		return null;
	}
}

export default Layout;

import React from 'react';

import InfoUsuario from '@dto/InfoUsuario';
import app, {AppContext, EstadoAplicacao} from '@src/app';
import CabecalhoSiorg from './cabecalho-siorg/CabecalhoSiorg';
import CuboFundo from './CuboFundo';
import c from './SiorgRoot.scss';
import './global.scss'; // insere CSS global da aplicação

interface Props {
	children: React.ReactNode;
}

/**
 * Componente de topo da aplicação.
 * Faz a primeira consulta para verificar se o usuário está autenticado.
 */
function SiorgRoot(props: Props) {
	const [rootContext, setRootContext] = React.useState({ // vai ser passado para AppContext.Provider
		estado: EstadoAplicacao.Carregando,
		msgErro: '', // exibida por este componente
		infoUsuario: {} as InfoUsuario // informações da sessão do Siorg
	});

	React.useEffect(() => {
		if (rootContext.estado === EstadoAplicacao.Carregando) {
			app.serverGet('sessao/infoUsuario', {}, false) // requisita informações sobre o usuário atual
				.then((dados: InfoUsuario) => { // usuário está logado
					setRootContext({
						estado: EstadoAplicacao.Logado,
						msgErro: '',
						infoUsuario: dados // guarda as informações do usuário
					});
				})
				.catch((err: any) => { // usuário não está logado
					setRootContext({
						estado: EstadoAplicacao.Erro,
						msgErro: err.message,
						infoUsuario: {} as InfoUsuario
					});
				});
		}
	}, []);

	switch (rootContext.estado) {
	case EstadoAplicacao.Carregando:
		return (
			<div className={c.naoCarregado}>
				<div>Carregando...</div>
				<CuboFundo />
			</div>
		);
	case EstadoAplicacao.Erro:
		return (
			<div className={c.naoCarregado}>
				<div>{rootContext.msgErro}</div>
				<div><a href={app.montaUrlJsf('index.jsf')}>Ir para a página de login</a></div>
				<CuboFundo />
			</div>
		);
	case EstadoAplicacao.Logado: // carrega a aplicação normalmente
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

export default SiorgRoot;

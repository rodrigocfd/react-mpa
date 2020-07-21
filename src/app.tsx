import React from 'react';
import ReactDOM from 'react-dom';

import prodCfg from '../producao.config.json';
import InfoUsuario from '@dto/InfoUsuario';
import SiorgRoot from '@src/comum/siorg-root/SiorgRoot';

const DEV_PORT_JSF = 8080;
const ISDEV = process.env.NODE_ENV === 'development';

enum EstadoAplicacao { Carregando, Logado, Erro }

/**
 * Tipo dos dados armazenados no contexto global da aplicação.
 */
interface ContextoApp {
	estado: EstadoAplicacao,
	msgErro: string,
	infoUsuario: InfoUsuario,
}

/**
 * Par getter/setter armazenado no contexto global da aplicação.
 */
type ContextoAppGetSet = [ContextoApp, React.Dispatch<React.SetStateAction<ContextoApp>>];

/**
 * Contexto global da aplicação.
 * As informações do usuário logado ficam armazenadas aqui.
 */
const AppContext = React.createContext({} as ContextoAppGetSet); // estado inicial é inválido

/**
 * Conjunto de funções gerais da aplicação.
 */
const app = {
	/**
	 * Retorna [context, setContext] do contexto global da aplicação.
	 */
	useContext: function(): ContextoAppGetSet {
		return React.useContext(AppContext);
	},

	/**
	 * Monta componente raiz da página no HTML, dentro de <SiorgRoot>.
	 * @param elemento Componente React que será renderizado na página.
	 */
	constroiPagina: function(componente: React.ReactNode) {
		ReactDOM.render(<SiorgRoot>{componente}</SiorgRoot>,
			document.getElementById('root'));
	},

	/**
	 * Adiciona, no começo do caminho, a URL completa da página JSF do Siorg
	 * antigo, e retorna a URL pronta para o JSF.
	 * @param caminho Nome da página JSF.
	 */
	montaUrlJsf: function(caminho: string): string {
		return ISDEV
			? `http://${window.location.hostname}:${DEV_PORT_JSF}${prodCfg.baseJsf}/${caminho}`
			: `${prodCfg.baseJsf}/${caminho}`;
	},

	/**
	 * Retorna uma URL absoluta para uma página HTML da aplicação.
	 * @param caminho Caminho absoluto para a página HTML, ex. 'propostas/listar.html'.
	 */
	montaUrlApp: function(caminho: string): string {
		return ISDEV
			? `/${caminho}`
			: `${prodCfg.baseApp}/${caminho}`;
	},

	/**
	 * Redireciona imediatamente para uma página HTML da aplicação REST.
	 * Passe um caminho absoluto em relação a src/ como argumento.
	 * @param pagina Caminho para a página HTML.
	 */
	redirecionaAgora: function(pagina: string) {
		window.location.href = app.montaUrlApp(pagina);
	},

	/**
	 * Faz uma requisição GET ao servidor retornando uma Promise, e trata erros.
	 * @param caminho Caminho a ser requisitado do servidor.
	 * @param payload Opcional; dados a serem enviados na requisição GET.
	 * @param semAlertaErro Opcional; se houver um erro não mostra popup.
	 */
	serverGet: function(caminho: string, payload = {}, alertaErro = true): Promise<any> {
		return fetch(`${prodCfg.apiRest}/${caminho}`, {
			method: 'GET',
			cache: 'no-cache',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'},
			redirect: 'follow',
			body: Object.keys(payload).length ? JSON.stringify(payload) : undefined,
		})
		.then(resp => {
			if (resp.status === 200) {
				return resp.json(); // tudo certo, encaminha resposta do servidor
			}

			let msg = '';
			switch (resp.status) {
				case 401: msg = 'Você não está logado (erro 401).'; break;
				case 500: msg = `500 - Internal Server Error - ${'d.mensagem'}`; break;
				case 504: msg = 'Parece que o servidor está fora do ar (erro 504).'; break;
				default:  msg = `Erro ${resp.status} - ${resp.statusText}`;
			}
			alertaErro && alert(msg);
			throw new Error(msg);
		});
	},

	/**
	 * Diz se o objeto está vazio, isto é, se não tem nenhuma propriedade setada.
	 * @param obj Objeto a ser analisada.
	 */
	isEmpty: function(obj: object): boolean {
		return Object.keys(obj).length === 0;
	},
};

export default app;
export {EstadoAplicacao, AppContext};
export type {ContextoApp, ContextoAppGetSet};

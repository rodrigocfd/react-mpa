import React from 'react';
import ReactDOM from 'react-dom';

import prodCfg from '../producao.config.json';
import SiorgRoot from 'src/comum/siorgRoot/SiorgRoot';

const DEV_PORT_JSF = 8080;
const ISDEV = process.env.NODE_ENV === 'development';

/**
 * Contexto global da aplicação.
 * As informações do usuário logado ficam armazenadas aqui.
 */
const AppContext = React.createContext();

/**
 * Conjunto de funções gerais da aplicação.
 */
const app = {
	/**
	 * Retorna [context, setContext] do contexto global da aplicação.
	 */
	useContext: function() {
		const [context, setContext] = React.useContext(AppContext);
		function setPartialContext(newVals) {
			setContext({...context, ...newVals});
		}
		return [context, setPartialContext];
	},

	/**
	 * Monta componente raiz da página no HTML.
	 * @param {object} elemento Componente React que será renderizado na página.
	 */
	constroiPagina: function(componente) {
		ReactDOM.render(<SiorgRoot>{componente}</SiorgRoot>,
			document.getElementById('root'));
	},

	/**
	 * Adiciona, no começo do caminho, a URL completa da página JSF do Siorg antigo,
	 * e retorna a URL pronta para o JSF.
	 * @param {string} caminho Nome da página JSF.
	 */
	montaUrlJsf: function(caminho) {
		return ISDEV
			? `http://${window.location.hostname}:${DEV_PORT_JSF}${prodCfg.baseJsf}/${caminho}`
			: `${prodCfg.baseJsf}/${caminho}`;
	},

	/**
	 * Retorna uma URL absoluta para uma página HTML da aplicação.
	 * @param {string} caminho Caminho absoluto para a página HTML, ex. 'propostas/listar.html'.
	 */
	montaUrlApp: function(caminho) {
		return ISDEV
			? `/${caminho}`
			: `${prodCfg.baseApp}/${caminho}`;
	},

	/**
	 * Redireciona imediatamente para uma página HTML da aplicação REST.
	 * Passe um caminho absoluto em relação a src/ como argumento.
	 * @param {string} pagina Caminho para a página HTML.
	 */
	redirecionaAgora: function(pagina) {
		window.location.href = app.montaUrlApp(pagina);
	},

	/**
	 * Faz uma requisição GET ao servidor retornando uma Promise, e trata erros.
	 * @param {string} caminho Caminho a ser requisitado do servidor.
	 * @param {object} payload Opcional; dados a serem enviados na requisição GET. Se não há, passe undefined.
	 * @param {boolean} semAlertaErro Opcional; se houver um erro não mostra popup.
	 */
	serverGet: function(caminho, payload, semAlertaErro) {
		return fetch(prodCfg.apiRest + caminho, {
			method: 'GET',
			cache: 'no-cache',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'},
			redirect: 'follow',
			body: JSON.stringify(payload)
		})
		.then(resp => {
			if (resp.status === 200) {
				return resp.json(); // tudo certo, encaminha resposta do servidor
			}

			let msg = '';
			switch (resp.status) {
				case 401: msg = 'Você não está logado (erro 401).'; break;
				case 500: msg = `500 - Internal Server Error - ${d.mensagem}`; break;
				case 504: msg = 'Parece que o servidor está fora do ar (erro 504).'; break;
				default:  msg = `Erro ${resp.status} - ${resp.statusText}`;
			}
			!semAlertaErro && alert(msg);
			throw new Error(msg);
		});
	}
};

export default app;
export {AppContext};

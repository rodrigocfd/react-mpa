import React from 'react';
import ReactDOM from 'react-dom';

import prodCfg from '../../producao.config.json';
import Layout from '@comum/layout/Layout';

const DEV_PORT_JSF = 8080;
const ISDEV = process.env.NODE_ENV === 'development';

/**
 * Conjunto de funções gerais da aplicação.
 */
const app = {
	/**
	 * Monta componente raiz da página no HTML, dentro de <SiorgRoot>.
	 * @param elemento Componente React que será renderizado na página.
	 */
	constroiPagina: function(componente: React.ReactNode) {
		ReactDOM.render(<Layout>{componente}</Layout>,
			document.getElementById('root'));
	},

	/**
	 * Retorna uma URL para uma página JSF ou da aplicação React.
	 * @param dest Destino: JSF ou aplicação React.
	 * @param caminho Caminho para a página, ex. 'propostas/listar.html'.
	 */
	montaUrl: function(dest: 'jsf' | 'app', caminho: string): string {
		if (dest === 'jsf') {
			return ISDEV
				? `http://${window.location.hostname}:${DEV_PORT_JSF}${prodCfg.baseJsf}/${caminho}`
				: `${prodCfg.baseJsf}/${caminho}`;
		}
		return ISDEV
			? `/${caminho}`
			: `${prodCfg.baseApp}/${caminho}`;
	},

	/**
	 * Faz uma requisição GET ao servidor retornando uma Promise, e trata erros.
	 * @param caminho Caminho a ser requisitado do servidor.
	 * @param payload Opcional; dados a serem enviados na requisição GET.
	 * @param semAlertaErro Opcional; se houver um erro não mostra popup.
	 */
	serverGet: function(caminho: string, payload = {}, alertaErro = true): Promise<any> {
		if (caminho[0] === '/') {
			caminho = caminho.substr(1); // remove '/' inicial, se houver
		}

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

// Extende o objeto array, adicionando métodos.
declare global {
	interface Array<T> {
		/**
		 * Returns the last element in the array. If empty, returns undefined.
		 */
		last(): T;
	}
}
if (!Array.prototype.last) {
	Array.prototype.last = function<T>(): T {
		return this.length > 0 ? this[this.length - 1] : undefined;
	};
}

export default app;

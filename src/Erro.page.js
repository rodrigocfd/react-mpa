import React from 'react';
import ReactDOM from 'react-dom';

import app from 'src/app';
import CuboFundo from 'src/_interno-app/CuboFundo';
import c from './Erro.scss';
import _ from './global.scss'; // insere CSS global da aplicação

/**
 * Página de erro da aplicação.
 * Opcionalmente exibe uma mensagem que tenha sido armazenada no sessionStorage.
 */
function Erro() {
	let mensagem = sessionStorage.getItem('mensagem');
	if (mensagem !== null) {
		sessionStorage.removeItem('mensagem');
	} else {
		mensagem = "Ocorreu um erro.";
	}

	return (<>
		<div className={c.mensagem}>
			<div>{mensagem}</div>
			<div><a href={app.montaUrlApp('index.html')}>Voltar</a></div>
			<CuboFundo />
		</div>
	</>);
}

ReactDOM.render(<Erro />, // renderiza diretamente, sem o wrapper <Siorg>
	document.getElementById('root'));

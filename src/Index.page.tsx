import React from 'react';

import app from '@src/app';
import LinkApp from '@src/comum/LinkApp';

/**
 * Primeira página da aplicação.
 */
function Index() {
	const [context] = app.useContext();

	return (
		<div>
			<h1>Início</h1>
			<div>
				Aplicação carregada com sucesso mas nada aqui
				ainda, {context.infoUsuario.nome.split(' ')[0]}.
			</div>
			<div>
				<LinkApp href={'unidade/unidade.html'}>Unidade</LinkApp>
			</div>
		</div>
	);
}

app.constroiPagina(<Index />);

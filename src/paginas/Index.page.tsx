import React from 'react';

import app from '@comum/app';
import Link from '@comum/Link';

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
				<Link dest="app" href={'unidade/unidade.html'}>Unidade</Link>
			</div>
		</div>
	);
}

app.constroiPagina(<Index />);

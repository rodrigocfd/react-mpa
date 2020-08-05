import React from 'react';

import app from '@comum/app';
import Link from '@comum/Link';

/**
 * Primeira página da aplicação.
 */
function Index() {
	return (
		<div>
			<h1>Início</h1>
			<div>
				Aplicação carregada com sucesso.
			</div>
			<div>
				<Link dest="app" href={'unidade/unidade.html'}>Unidade</Link>
			</div>
		</div>
	);
}

app.constroiPagina(<Index />);

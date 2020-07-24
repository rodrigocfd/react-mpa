import React from 'react';

import app from '@comum/app';
import LinkApp from '@comum/LinkApp';
import Arvore from '@comum/arvore/Arvore';
import Abas from '@comum/abas/Abas';
import c from './Unidade.scss';

function Unidade() {
	return (
		<div className={c.flex}>
			<div className={c.esquerda}>
				<div className={c.arvore}>
					<Arvore idSelecionada={23} onSelecionaUnidade={u => console.log(u)} />
				</div>
				<div><LinkApp href="index.html">Retornar</LinkApp></div>
			</div>
			<div className={c.direita}>
				<Abas abas={[
					{titulo: 'Primeira', conteudo: <div>FOO FOO FOO FOO FOO</div>},
					{titulo: 'Segunda', conteudo: <div>asdf asdf asdasd asdasd</div>},
					{titulo: 'Terceira', conteudo: <div>3</div>},
				]} />
			</div>
		</div>
	);
}

app.constroiPagina(<Unidade />);

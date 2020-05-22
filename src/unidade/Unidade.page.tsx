import React from 'react';

import app from '@src/app';
import Arvore from '@src/comum/arvore/Arvore';
import Abas from '@src/comum/abas/Abas';
import c from './Unidade.scss';

function Unidade() {
	return (
		<div className={c.flex}>
			<div className={c.esquerda}>
				<div className={c.arvore}>
					<Arvore idSelecionada={23} onSelecionaUnidade={u => console.log(u)} />
				</div>
				<div><a href={app.montaUrlApp('index.html')}>Retornar</a></div>
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

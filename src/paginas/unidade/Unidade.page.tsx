import React from 'react';

import UnidadeNoArvore from '@dto/UnidadeNoArvore';
import app from '@comum/app';
import Link from '@comum/Link';
import Arvore from '@comum/arvore/Arvore';
import Abas from '@comum/abas/Abas';
import Modal from './Modal';
import c from './Unidade.scss';

function Unidade() {
	const [hierarquiaSelec, setHierarquiaSelec] = React.useState([] as UnidadeNoArvore[]);
	const [modalAberta, setModalAberta] = React.useState(false);

	function selecionouUnidade(hierarquiaSelec: UnidadeNoArvore[]) {
		setHierarquiaSelec(hierarquiaSelec);
	}

	return (
		<div className={c.flex}>
			<div className={c.esquerda}>
				<div className={c.arvore}>
					<Arvore idSelecionada={23} onSelecionaUnidade={selecionouUnidade} />
				</div>
				<div><Link dest="app" href="index.html">Retornar</Link></div>
			</div>
			<div className={c.direita}>
				<Abas abas={[
					{titulo: 'Primeira', conteudo: <div>FOO FOO FOO FOO FOO</div>},
					{titulo: 'Segunda', conteudo: <div>asdf asdf asdasd asdasd</div>},
					{titulo: 'Terceira', conteudo: <div>3</div>},
				]} />
				<div>
					<div>Unidade selecionada:</div>
					{hierarquiaSelec.length > 0 &&
						<>
							<div>{hierarquiaSelec[hierarquiaSelec.length - 1].codigo} - {hierarquiaSelec[hierarquiaSelec.length - 1].sigla}</div>
							<div>{hierarquiaSelec[hierarquiaSelec.length - 1].denominacao}</div>
							<div>
								<button onClick={() => setModalAberta(true)}>Abrir modal</button>
							</div>
						</>
					}
				</div>
			</div>
			{modalAberta && <Modal texto="Fufu" onClose={() => setModalAberta(false)} />}
		</div>
	);
}

app.constroiPagina(<Unidade />);

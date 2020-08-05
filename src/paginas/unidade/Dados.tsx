import React from 'react';

import UnidadeDados from '@dto/UnidadeDados';
import app from '@comum/app';
import Box from '@comum/Box';
import Carregando from '@comum/Carregando';
import styles from './Dados.scss';

interface Props {
	idUnidade?: number,
}

/**
 * Consulta e exibe dados de uma unidade.
 */
function Dados({idUnidade}: Props) {
	const [un, setUn] = React.useState({} as UnidadeDados);

	React.useEffect(() => {
		if (idUnidade) {
			app.serverGet(`unidade/dados?id=${idUnidade}`)
				.then((un: UnidadeDados) => setUn(un));
		}
	}, [idUnidade]);

	return app.isEmpty(un) ? <Carregando /> : (
		<Box>
			<div className={styles.dados}>
				<h3>Informações da Unidade</h3>
				<div>
					<Linha lbl="Nome" val={`${un.denominacao} (${un.sigla})`} />
					<Linha lbl="Código" val={un.codigo} />
					<Linha lbl="Esfera" val={un.esfera} />
					<Linha lbl="Poder" val={un.poder} />
					<Linha lbl="Natureza Jurídica" val={un.naturezaJuridica} />
					<Linha lbl="Subnatureza Jurídica" val={un.subnaturezaJuridica} />
					<Linha lbl="Categoria" val={un.categoria} />
					<Linha lbl="Permite cargos por valor"
						val={<div className={un.permiteCargosValor ? styles.sim : styles.nao} />} />
					<Linha lbl="Valida autoridade"
						val={<div className={un.validaAutoridade ? styles.sim : styles.nao} />} />
					<Linha lbl="Valida distribuição"
						val={<div className={un.validaDistribuicao ? styles.sim : styles.nao} />} />
				</div>
			</div>
		</Box>
	)
}

interface LinhaProps {
	lbl: string,
	val: string | React.ReactNode,
}

function Linha(props: LinhaProps) {
	return (
		<div className={styles.linha}>
			<div>{props.lbl || '--'}</div>
			<div>{props.val || '--'}</div>
		</div>
	);
}

export default Dados;

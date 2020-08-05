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

	return !un ? <Carregando /> : (
		<Box>
			<div className={styles.dados}>
				<h3>Informações da Unidade</h3>
				<div>Esfera: {un.esfera}</div>
				<div>Poder: {un.poder}</div>
				<div>NJ: {un.naturezaJuridica}</div>
				<div>SNJ: {un.subnaturezaJuridica}</div>
				<div>Categoria: {un.categoria}</div>
				<div>{un.permiteCargosValor}</div>
				<div>{un.validaAutoridade}</div>
				<div>{un.validaDistribuicao}</div>
			</div>
		</Box>
	)
}

export default Dados;

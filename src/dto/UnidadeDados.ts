/**
 * Informações de uma unidade organizacional.
 */
interface UnidadeDados {
	codigo: number,
	denominacao: string,
	sigla: string,
	missao: string,
	objetivoEstrategico: string,
	competencia: string,
	finalidade: string,
	esfera: string,
	poder: string,
	naturezaJuridica: string,
	subnaturezaJuridica: string,
	categoria: string,
	permiteCargosValor: boolean,
	validaAutoridade: boolean,
	validaDistribuicao: boolean,
}

export default UnidadeDados;

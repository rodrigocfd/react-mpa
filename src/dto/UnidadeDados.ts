/**
 * Informações de uma unidade organizacional que complementam UnidadeNoArvore.
 */
interface UnidadeDados {
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

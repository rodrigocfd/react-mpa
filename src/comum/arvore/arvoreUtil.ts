import UnidadeNoArvore from '@dto/UnidadeNoArvore';

enum EstadoTelaInteira { Normal, TelaInteira, Encolhendo }

enum EstadoNo { Fechado, Aberto, Carregando }

/**
 * Conjunto de funções utilizadas na árvore de unidades.
 */
const arvoreUtil = {
	/**
	 * Tempo de animação de expandir a árvore para tela inteira.
	 * Deve ser igual ao que está no CSS.
	 */
	tempoAnimacao: 150,

	/**
	 * Retorna um array com a hierarquia da raiz até a unidade selecionada.
	 * @param raiz Unidade raiz onde começa a busca.
	 * @param idSel ID da unidade selecionada a ser encontrada.
	 */
	montaHierarquiaTripa: function montaHierarquiaTripa(
		raiz: UnidadeNoArvore, idSel: number): UnidadeNoArvore[]
	{
		if (raiz.id === idSel) return [raiz];
		for (const filha of raiz.filhas) {
			const encontradas = montaHierarquiaTripa(filha, idSel); // recursivamente
			if (encontradas.length > 0) return [raiz, ...encontradas];
		}
		return []; // unidade não encontrada
	},

	/**
	 * Diz se uma unidade é descendente de outra. Uma unidade não é pai dela
	 * própria.
	 * @param filha Unidade filha.
	 * @param supostoPai Unidade que queremos saber se é pai da filha.
	 */
	ehPaiDaUnidade: function ehPaiDaUnidade(
		supostaFilha: UnidadeNoArvore, supostoPai: UnidadeNoArvore): boolean
	{
		for (const filha of supostoPai.filhas) {
			if (filha.id === supostaFilha.id) return true;
			if (ehPaiDaUnidade(supostaFilha, filha)) return true;
		}
		return false; // não é pai
	},
};

export default arvoreUtil;
export {EstadoTelaInteira, EstadoNo};

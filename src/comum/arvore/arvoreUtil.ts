import UnidadeNoArvore from '@dto/UnidadeNoArvore';

/**
 * Conjunto de funções utilizadas na árvore de unidades.
 */
const arvoreUtil = {
	/**
	 * Vasculha a árvore recursivamente por uma unidade com ID igual ao
	 * informado.
	 * @param unid Unidade raiz onde começa a busca.
	 * @param idSel ID da unidade selecionada a ser encontrado.
	 */
	achaSelecionada: function achaSelecionada(
		unid: UnidadeNoArvore, idSel: number): UnidadeNoArvore | null
	{
		if (unid.id === idSel) return unid;
		for (const filha of unid.filhas) {
			const encontrada = achaSelecionada(filha, idSel); // recursivamente
			if (encontrada !== null) return encontrada;
		}
		return null; // unidade não encontrada
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

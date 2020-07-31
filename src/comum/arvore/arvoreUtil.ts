import UnidadeNoArvore from '@dto/UnidadeNoArvore';

enum EstadoTelaInteira { Normal, TelaInteira, Encolhendo }

enum EstadoNo { Fechado, Expandido, Carregando }

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
	montaHierarquiaFlat: function montaHierarquiaFlat(
		raiz: UnidadeNoArvore, idSel: number): UnidadeNoArvore[]
	{
		if (raiz.id === idSel) return [raiz];
		for (const filha of raiz.filhas) {
			const encontradas = montaHierarquiaFlat(filha, idSel); // recursivamente
			if (encontradas.length > 0) return [raiz, ...encontradas];
		}
		return []; // unidade não encontrada
	},

	/**
	 * Diz se uma unidade é a selecionada (a última no array).
	 * @param unidade Suposta unidade selecionada.
	 * @param hierarquiaSelec Hierarquia da raiz até à unidade selecionada.
	 */
	ehSelec: function(
		unidade: UnidadeNoArvore,
		hierarquiaSelec: UnidadeNoArvore[]): boolean
	{
		return hierarquiaSelec[hierarquiaSelec.length - 1].id === unidade.id;
	},

	/**
	 * Diz se uma unidade é um dos pais de outra.
	 * @param unidade Suposta unidade pai.
	 * @param hierarquiaSelec Hierarquia da raiz até à unidade selecionada.
	 */
	ehPaiDaSelec: function(
		unidade: UnidadeNoArvore,
		hierarquiaSelec: UnidadeNoArvore[]): boolean
	{
		// Não compara a última unidade, que é a selecionada,
		// pois uma unidade não pode ser pai de si mesma.
		for (let i = 0; i < hierarquiaSelec.length - 1; ++i) {
			if (unidade.id === hierarquiaSelec[i].id) {
				return true;
			}
		}
		return false;
	}
};

export default arvoreUtil;
export {EstadoTelaInteira, EstadoNo};

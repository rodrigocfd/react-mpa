type TipoUnidade = 'ET' | 'OR' | 'EN' | 'UA' | 'UC' | 'RE';
type NivelNormatizacao = 'LEID' | 'ATOI';

/**
 * Unidade que vem na consulta que alimenta a árvore.
 */
interface UnidadeNoArvore {
	id: number,
	codigo: number,
	denominacao: string,
	sigla: string,
	tipo: TipoUnidade,
	nivelNormatizacao: NivelNormatizacao,
	idPai: number,
	temFilhas: boolean,
	filhas: UnidadeNoArvore[],
}

export default UnidadeNoArvore;
export type {TipoUnidade, NivelNormatizacao};

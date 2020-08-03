/**
 * Unidade que vem na consulta que alimenta a árvore.
 */
interface UnidadeNoArvore {
	id: number,
	codigo: number,
	denominacao: string,
	sigla: string,
	tipo: 'ET' | 'OR' | 'EN' | 'UA' | 'UC', // RE?
	nivelNormatizacao: 'LEID' | 'ATOI',
	idPai: number,
	temFilhas: boolean,
	filhas: UnidadeNoArvore[],
}

export default UnidadeNoArvore;

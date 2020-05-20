interface UnidadeNoArvore {
	id: number;
	codigo: number;
	denominacao: string;
	sigla: string;
	tipo: string;
	nivelNormatizacao: string;
	idPai: number;
	temFilhas: boolean;
	filhas: UnidadeNoArvore[];

}

export default UnidadeNoArvore;

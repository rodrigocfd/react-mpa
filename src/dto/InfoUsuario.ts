import Perfil from './Perfil';
import Unidade from './Unidade';

/**
 * Informações recebidas de um usuário logado.
 */
interface InfoUsuario {
	releaseSistema: string,
	codigo: string,
	nome: string,
	perfis: Perfil[],
	transacoes: string[],
	transacaoAcessada: string,
	orgaoUsuario: Unidade,
	unidadePermitida: Unidade,
	unidadeRaiz: Unidade,
}

export default InfoUsuario;

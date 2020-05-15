import PropTypes from 'prop-types';

/**
 * O tipo unidade que vem do banco.
 */
const PTUnidade = PropTypes.shape({
	id: PropTypes.number.isRequired,
	codigo: PropTypes.number.isRequired,
	denominacao: PropTypes.string.isRequired,
	sigla: PropTypes.string.isRequired,
	tipo: PropTypes.string.isRequired,
	nivelNormatizacao: PropTypes.string.isRequired,
	idPai: PropTypes.number,
	temFilhas: PropTypes.bool.isRequired,
	filhas: PropTypes.arrayOf(PropTypes.object).isRequired
});

export default PTUnidade;

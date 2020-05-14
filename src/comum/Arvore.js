import React from 'react';
import PropTypes from 'prop-types';

import app from 'src/app';
import ArvoreNo from './ArvoreNo';
import c from './Arvore.scss';

function Arvore(props) {
	const [raiz, setRaiz] = React.useState(null);

	React.useEffect(() => {
		app.serverGet(`/arvore/unidade?id=${props.idRaiz}`)
			.then(raiz => setRaiz(raiz));
	}, []);

	return !raiz ? null : (
		<div className={c.arvore}>
			<ArvoreNo unidade={raiz}
				onClick={props.onClick} onMouseOver={props.onMouseOver} />
		</div>
	);
}

Arvore.propTypes = {
	idRaiz: PropTypes.number.isRequired,
	onClick: PropTypes.func,
	onMouseOver: PropTypes.func
};

export default Arvore;

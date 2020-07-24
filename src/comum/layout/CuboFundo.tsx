import React from 'react';

import c from './CuboFundo.scss';

interface Props {
	gira?: boolean,
}

/**
 * Coloca a imagem do cubo do Siorg no background.
 */
function CuboFundo({gira}: Props) {
	const cls = [c.cuboFundo, gira ? c.gira : ''].join(' ');

	return (
		<div className={cls}></div>
	);
}

export default CuboFundo;

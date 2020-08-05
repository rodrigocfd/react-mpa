import React from 'react';

import styles from './CuboFundo.scss';

interface Props {
	gira?: boolean,
}

/**
 * Coloca a imagem do cubo do Siorg no background.
 */
function CuboFundo({gira}: Props) {
	const cls = [
		styles.cuboFundo,
		gira ? styles.gira : ''
	].join(' ');

	return (
		<div className={cls}></div>
	);
}

export default CuboFundo;

import React from 'react';

import styles from './Box.scss';

interface Props {
	children: React.ReactNode,
}

/**
 * Container que exibe o conteúdo dentro de uma caixa com borda.
 */
function Box({children}: Props) {
	return (
		<div className={styles.box}>
			{children}
		</div>
	);
}

export default Box;

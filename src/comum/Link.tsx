import React from 'react';

import app from '@comum/app';

interface Props {
	dest: 'jsf' | 'app',
	href?: string,
	className?: string,
	children: React.ReactNode,
}

/**
 * Renderiza um <a href=""> que pode ser para uma página JSF.
 */
function Link(props: Props) {
	return (
		<a href={app.montaUrl(props.dest, props.href || '')}
			className={props.className}>{props.children}</a>
	);
}

export default Link;

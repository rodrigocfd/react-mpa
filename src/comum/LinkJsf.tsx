import React from 'react';

import app from '@comum/app';

interface Props {
	href: string,
	className?: string,
	children: React.ReactNode,
}

/**
 * Renderiza um link para uma página JSF do Siorg.
 */
function LinkJsf(props: Props) {
	return (
		<a className={props.className}
			href={app.montaUrlJsf(props.href)}>{props.children}</a>
	);
}

export default LinkJsf;

import React from 'react';

import app from '@comum/app';

interface Props {
	href: string,
	className?: string,
	children: React.ReactNode,
}

/**
 * Renderiza um link para uma página REST da aplicação.
 */
function LinkApp(props: Props) {
	return (
		<a className={props.className}
			href={app.montaUrlApp(props.href)}>{props.children}</a>
	);
}

export default LinkApp;

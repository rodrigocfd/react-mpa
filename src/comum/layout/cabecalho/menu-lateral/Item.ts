/**
 * Descreve um item do menu lateral da aplicação.
 */
interface Item {
	label: string,
	menu?: Item[],
	linkJsf?: string,
	linkApp?: string,
}

export type {Item};

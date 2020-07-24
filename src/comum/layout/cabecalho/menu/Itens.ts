/**
 * Descreve os tipos de itens.json, que popula o menu principal da aplicação.
 */

interface ItemHorz {
	label: string,
	menuVert1: ItemVert1[],
}

interface ItemVert1 {
	label: string,
	oldLink?: string,
	menuVert2?: ItemVert2[],
}

interface ItemVert2 {
	label: string,
	oldLink: string,
}

export type {ItemHorz, ItemVert1, ItemVert2};

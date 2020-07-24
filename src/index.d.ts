// Declarações dos tipos para imports usados no projeto.

declare module '*.gif' {
	const fileName: string;
	export default fileName;
}
declare module '*.jpg' {
	const fileName: string;
	export default fileName;
}
declare module '*.png' {
	const fileName: string;
	export default fileName;
}

declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

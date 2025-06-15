export const COMPONENT_EXTENSIONS = [
	".jsx",
	".tsx",
	".vue",
	".svelte",
] as const;

export type ComponentExtension = (typeof COMPONENT_EXTENSIONS)[number];

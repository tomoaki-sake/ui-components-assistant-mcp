import {
	COMPONENT_EXTENSIONS,
	type ComponentExtension,
} from "../constants/component-extensions.js";

const COMPONENT_TYPES: Record<ComponentExtension, string> = {
	".jsx": "React",
	".tsx": "React TypeScript",
	".vue": "Vue",
	".svelte": "Svelte",
} as const;

export const determineComponentType = (filePath: string): string => {
	const extension = COMPONENT_EXTENSIONS.find((ext) =>
		filePath.endsWith(ext),
	) as ComponentExtension | undefined;
	return extension ? COMPONENT_TYPES[extension] : "Unknown";
};

import { COMPONENT_EXTENSIONS } from "../constants/component-extensions.js";

export const isComponentFile = (fileName: string): boolean => {
	return COMPONENT_EXTENSIONS.some((ext) => fileName.endsWith(ext));
};

import path from "node:path";
import { determineComponentType } from "./determine-component-type.js";

type ComponentInfo = {
	name: string;
	path: string;
	fullPath: string;
	type: string;
};

export const extractComponentInfo = async (
	filePaths: string[],
	basePath: string,
): Promise<ComponentInfo[]> => {
	const components: ComponentInfo[] = [];

	for (const filePath of filePaths) {
		const fileName = path.basename(filePath);
		const relativePath = path.relative(basePath, filePath);

		// 簡単な情報のみを抽出
		components.push({
			name: fileName.split(".")[0],
			path: relativePath,
			fullPath: filePath,
			type: determineComponentType(filePath),
		});
	}

	return components;
};

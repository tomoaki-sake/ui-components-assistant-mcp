import fs from "node:fs";
import path from "node:path";
import { isComponentFile } from "./is-component-file.js";

export const findComponentFiles = async (
	dirPath: string,
): Promise<string[]> => {
	const files: string[] = [];

	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);

		// node_modules や .git ディレクトリはスキップ
		if (
			entry.isDirectory() &&
			!["node_modules", ".git", "dist", "build"].includes(entry.name)
		) {
			const subDirFiles = await findComponentFiles(fullPath);
			files.push(...subDirFiles);
		} else if (isComponentFile(entry.name)) {
			files.push(fullPath);
		}
	}

	return files;
};

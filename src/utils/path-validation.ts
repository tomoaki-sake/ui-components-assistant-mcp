import path from "node:path";

// rootPath配下かチェックする関数
export const isWithinRootPath = (
	targetPath: string,
	rootPath: string,
): boolean => {
	const resolvedTarget = path.resolve(targetPath);
	const resolvedRoot = path.resolve(rootPath);
	return resolvedTarget.startsWith(resolvedRoot);
};

import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
	extractComponentInfo,
	findComponentFiles,
	isWithinRootPath,
} from "../utils/index.js";

export const listUIComponents = (rootPath: string) => ({
	name: "listUIComponents",
	description: "Lists UI components in a directory",
	input: {
		dirPath: z
			.string()
			.optional()
			.describe(
				"Components directory relative to repository root. If not provided, scans the entire repository",
			),
	},
	async execute({ dirPath }: { dirPath?: string }) {
		try {
			// 相対パスか絶対パスかを判断
			const targetPath = dirPath
				? path.isAbsolute(dirPath)
					? dirPath
					: path.join(rootPath, dirPath)
				: rootPath;

			if (!isWithinRootPath(targetPath, rootPath)) {
				return {
					content: [
						{
							type: "text",
							text: `Access denied: Path '${targetPath}' is not within repository root: ${rootPath}`,
						},
					],
					isError: true,
				};
			}

			// 指定されたディレクトリが存在するか確認
			if (!fs.existsSync(targetPath)) {
				return {
					content: [
						{
							type: "text",
							text: `Directory does not exist: ${targetPath}`,
						},
					],
					isError: true,
				};
			}

			// コンポーネントファイルを検索
			const componentFiles = await findComponentFiles(targetPath);

			if (componentFiles.length === 0) {
				return {
					content: [
						{
							type: "text",
							text: `No UI components found in directory: ${targetPath}`,
						},
					],
				};
			}

			// コンポーネント情報を抽出
			const components = await extractComponentInfo(componentFiles, rootPath);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(components, null, 2),
					},
				],
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return {
				content: [
					{
						type: "text",
						text: `Error listing UI components: ${errorMessage}`,
					},
				],
				isError: true,
			};
		}
	},
});

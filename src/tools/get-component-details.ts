import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { determineComponentType, isWithinRootPath } from "../utils/index.js";

export const getComponentDetails = (rootPath: string) => ({
	name: "getComponentDetails",
	description: "Gets details for a specific component",
	input: {
		componentPath: z
			.string()
			.describe("Path to the component file, relative to repository root"),
	},
	async execute({ componentPath }: { componentPath: string }) {
		try {
			const fullPath = path.isAbsolute(componentPath)
				? componentPath
				: path.join(rootPath, componentPath);

			if (!isWithinRootPath(fullPath, rootPath)) {
				return {
					content: [
						{
							type: "text",
							text: `Access denied: Path '${fullPath}' is not within repository root: ${rootPath}`,
						},
					],
					isError: true,
				};
			}

			if (!fs.existsSync(fullPath)) {
				return {
					content: [
						{
							type: "text",
							text: `Component file does not exist: ${fullPath}`,
						},
					],
					isError: true,
				};
			}

			const content = fs.readFileSync(fullPath, "utf-8");
			const fileName = path.basename(fullPath);
			const relativePath = path.relative(rootPath, fullPath);

			// コンポーネントの詳細分析（簡易版）
			const details = {
				name: fileName.split(".")[0],
				relativePath,
				fullPath,
				extension: path.extname(fullPath),
				size: content.length,
				lines: content.split("\n").length,
				type: determineComponentType(fullPath),
				content: content.slice(0, 1000) + (content.length > 1000 ? "..." : ""), // 最初の1000文字だけを返す
			};

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(details, null, 2),
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
						text: `Error getting component details: ${errorMessage}`,
					},
				],
				isError: true,
			};
		}
	},
});

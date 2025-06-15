import fs from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getComponentDetails } from "./tools/get-component-details.js";
import { listUIComponents } from "./tools/list-ui-components.js";

// リポジトリのルートパスを取得（コマンドライン引数から）
const rootPath = process.argv[2];
console.error(`Using repository root path: ${rootPath}`);

if (!fs.existsSync(rootPath)) {
	console.error(`Error: Specified path does not exist: ${rootPath}`);
	process.exit(1);
}

// サーバーの作成
const server = new McpServer({
	name: "UI Components Explorer",
	version: "1.0.0",
	capabilities: {
		tools: { listChanged: true },
	},
});

const listUIComponentsTool = listUIComponents(rootPath);
server.tool(
	listUIComponentsTool.name,
	listUIComponentsTool.input,
	async (input) => {
		const result = await listUIComponentsTool.execute(input);
		return {
			content: result.content.map((item) => ({
				type: "text",
				text: item.text,
			})),
			isError: result.isError,
		};
	},
);

const getComponentDetailsTool = getComponentDetails(rootPath);
server.tool(
	getComponentDetailsTool.name,
	getComponentDetailsTool.input,
	async (input) => {
		const result = await getComponentDetailsTool.execute(input);
		return {
			content: result.content.map((item) => ({
				type: "text",
				text: item.text,
			})),
			isError: result.isError,
		};
	},
);

const main = async () => {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error(
		`UI Components Explorer MCP server started with repository root: ${rootPath}`,
	);
};

main().catch((error) => {
	console.error("Error starting server:", error);
	process.exit(1);
});

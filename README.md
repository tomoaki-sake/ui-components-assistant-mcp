# UI Components Assistant MCP Server

A Model Context Protocol (MCP) server that provides tools to explore and analyze UI components in your codebase. This server enables AI assistants to understand the structure and details of UI components in your project.

## Features

- **Component Discovery**: Automatically find UI components in your repository
- **Component Analysis**: Extract detailed information about component files
- **Path Safety**: Restrict access to outside the directory specified in server configuration
- **Multiple Formats**: Support for various UI component file formats (React, Vue, etc.)

## Available Tools

### 1. `listUIComponents`
Lists all UI components found in a specified directory or the entire repository.

**Parameters:**
- `dirPath` (optional): Components directory relative to repository root. If not provided, scans the entire repository.

**Returns:**
- JSON array of component information including names, paths, and basic metadata

### 2. `getComponentDetails`
Gets detailed information about a specific component file.

**Parameters:**
- `componentPath`: Path to the component file, relative to repository root

**Returns:**
- Detailed component information including:
  - Component name and type
  - File path and size
  - Line count
  - Content preview (first 1000 characters)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd ui-components-assistant
```

2. Install dependencies and build:
```bash
pnpm install
pnpm run build
```

## Usage

#### Configuration

Add the following configuration to your AI assistant's MCP configuration file:

```json
{
  "mcpServers": {
    "ui-components-assistant": {
      "command": "node",
      "args": ["/path/to/ui-components-assistant/dist/server.js", "/path/to/your/repository"],
      "env": {}
    }
  }
}
```

**Configuration details:**
- `command`: The command to run the server
- `args`: Array containing the path to the built server script and the repository path to analyze

Refer to your AI assistant's documentation for the specific configuration file location and any additional setup requirements.

## Security

- All file access is restricted to within the specified repository root
- Path traversal attacks are prevented through path validation
- Only existing files can be accessed

## License

This project is licensed under the MIT License.

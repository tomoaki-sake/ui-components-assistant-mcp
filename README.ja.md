# UI Components Assistant MCP Server

コードベース内のUIコンポーネントを探索・分析するためのModel Context Protocol (MCP) サーバーです。このサーバーにより、AIアシスタントがプロジェクト内のUIコンポーネントの構造と詳細を理解できるようになります。

## 機能

- **コンポーネント検出**: リポジトリ内のUIコンポーネントを自動検出
- **コンポーネント分析**: コンポーネントファイルの詳細情報を抽出
- **パス安全性**: サーバー設定で指定したディレクトリ外へのアクセスを制限
- **多様な形式**: 様々なUIコンポーネントファイル形式をサポート（React、Vueなど）

## 利用可能なツール

### 1. `listUIComponents`
指定されたディレクトリまたはリポジトリ全体で見つかったUIコンポーネントをリスト表示します。

**パラメータ:**
- `dirPath` (オプション): リポジトリルートからの相対パスでコンポーネントディレクトリを指定。指定されない場合は、リポジトリ全体をスキャンします。

**戻り値:**
- 名前、パス、基本メタデータを含むコンポーネント情報のJSON配列

### 2. `getComponentDetails`
特定のコンポーネントファイルの詳細情報を取得します。

**パラメータ:**
- `componentPath`: リポジトリルートからの相対パスでコンポーネントファイルを指定

**戻り値:**
- 以下を含む詳細なコンポーネント情報:
  - コンポーネント名とタイプ
  - ファイルパスとサイズ
  - 行数
  - コンテンツプレビュー（最初の1000文字）

## セットアップ

まず、このリポジトリをクローンします:
```bash
git clone <repository-url>
cd ui-components-assistant
```

以下のいずれかの方法でセットアップを行います:

### ローカルセットアップ

依存関係をインストールしてビルドします:
```bash
pnpm install
pnpm run build
```

### Dockerセットアップ

Dockerイメージをビルドします:
```bash
docker build -t ui-components-assistant .
```

## 使用方法

### ローカル使用の設定

AIアシスタントのMCP設定ファイルに以下の設定を追加してください:

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

### Docker使用の設定

AIアシスタントのMCP設定ファイルに以下の設定を追加してください:

```json
{
  "mcpServers": {
    "ui-components-assistant": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "/path/to/your/repository:/workspace",
        "ui-components-assistant",
        "/workspace"
      ],
      "env": {}
    }
  }
}
```

**設定詳細:**
- `command`: サーバーを実行するコマンド（ローカルの場合は "node"、コンテナ化の場合は "docker"）
- `args`: ビルドされたサーバースクリプトのパスと分析対象リポジトリのパスを含む配列
- Docker使用時: リポジトリを `/workspace` にボリュームマウントし、`/workspace` をリポジトリパスとして渡します

## セキュリティ

- すべてのファイルアクセスは指定されたリポジトリルート内に制限
- パス検証によりパストラバーサル攻撃を防止
- 存在するファイルのみアクセス可能

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

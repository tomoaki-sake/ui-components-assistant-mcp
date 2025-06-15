FROM node:24-alpine AS builder

# pnpmをインストール
RUN npm install -g pnpm

# ソースコードをコピー
COPY src /app/src
COPY package.json pnpm-lock.yaml* tsconfig.json /app/

WORKDIR /app

# キャッシュマウントを使用して依存関係をインストール
RUN --mount=type=cache,target=/root/.local/share/pnpm pnpm install

# アプリケーションをビルド
RUN pnpm run build

FROM node:24-alpine AS release

WORKDIR /app

# ビルド成果物と必要なファイルのみをコピー
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

# 本番環境変数を設定
ENV NODE_ENV=production

# pnpmをインストール
RUN npm install -g pnpm

# 本番用依存関係のみをインストール
RUN pnpm install --prod --frozen-lockfile

# エントリーポイントを設定
ENTRYPOINT ["node", "dist/server.js"]

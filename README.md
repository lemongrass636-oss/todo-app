
# 📄 README.md (プロジェクト全体ドキュメント)

# React Todo & Scheduler App

Material UI と React Router を活用した、モダンで多機能なシングルページアプリケーション（SPA）です。タスク管理だけでなく、カレンダーと連動したスケジューリングや進捗の可視化が可能です。

## 1. プロジェクトの特長

* 📅 **カレンダー連携**: タスクの期限日をカレンダー上に可視化。
* 📊 **進捗レポート**: 完了率を円形プログレスバーでリアルタイムに表示。
* 💾 **永続化**: ブラウザの `localStorage` を使用し、リロード後もデータを保持。
* 📱 **レスポンシブデザイン**: PC、タブレット、スマホの各画面サイズに最適化。

## 2. 技術スタック

* **Frontend**: React (TypeScript)
* **UI Library**: Material UI (MUI) v5
* **Routing**: React Router v6
* **Date Management**: Day.js
* **Form Controls**: MUI X Date Pickers

## 3. コンポーネント構成

アプリは以下の階層構造で構成されています。

```text
src/
├── App.tsx             # ルーティング・共通ナビゲーション
├── pages/
│   ├── TodoPage.tsx    # メイン機能（タスク一覧・統計・カレンダー）
│   └── SettingsPage.tsx # アプリ設定画面

```

### 主要画面の概要

| 画面名 | パス | 主な機能 |
| --- | --- | --- |
| **Home (Todo)** | `/` | タスクの追加・削除・完了管理、日付フィルタリング、進捗表示 |
| **Settings** | `/settings` | ダークモード切り替え、通知設定（UIのみ） |

## 4. 詳細仕様

### データ永続化 (Storage)

タスクデータは `my-todos` というキー名で `localStorage` に保存されます。

* **保存のタイミング**: タスクの追加、削除、完了状態の切り替え時。

### フィルタリング・ソート

* **フィルタ**: カレンダーで選択した日付に該当する期限のタスクのみを表示。
* **ソート**: 「期限が近い順」に自動で並び替え。期限未設定のタスクは下部に配置。


## 5. セットアップ手順

### プロジェクトの新規作成 (Vite)

まだプロジェクトを作成していない場合は、以下のコマンドで React + TypeScript の環境を構築します。

```bash
# プロジェクトの作成（手順に沿って React > TypeScript を選択）
npm create vite@latest my-todo-app -- --template react-ts

# ディレクトリ移動
cd my-todo-app

```

### 依存パッケージのインストール

本プロジェクトで使用しているライブラリを一括でインストールします。

```bash
# 必要なライブラリのインストール
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom
npm install dayjs @mui/x-date-pickers

```

### 開発サーバーの起動

Viteの高速なホットリロード機能を使用して開発を開始します。

```bash
npm run dev

```

---

### 💡 補足：Viteを使うメリット

* **起動が圧倒的に速い**: 従来の `create-react-app` (Webpack) に比べ、プロジェクトの立ち上げやコード修正の反映が非常に高速です。
* **モダンな環境**: 最新のブラウザ機能（ES Modules）を最大限に活用しています。


## 6. 今後の展望 (Roadmap)

* [ ] ダークモードのグローバルテーマ適用（Context APIの導入）
* [ ] タスクのカテゴリー分け機能
* [ ] 完了済みタスクの一括削除機能
* [ ] バックエンド（Firebase/Node.js）との連携によるクラウド同期

---

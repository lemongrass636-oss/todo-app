
# コンポーネント仕様書: App.tsx

## 1. 概要

本コンポーネントは、アプリケーションの**ルート（基盤）**となるコンポーネントです。
`React Router` を用いたページルーティング機能と、`Material UI` を用いた共通ナビゲーションバーを提供します。

## 2. 使用技術

* **UI Framework**: Material UI (MUI) v5
* **Routing**: react-router-dom v6
* **Icons/Layout**: AppBar, Toolbar, Container

## 3. 画面構成

アプリケーションは大きく分けて以下の3つのエリアで構成されます。

| エリア | コンポーネント / 役割 | 備考 |
| --- | --- | --- |
| **Header** | `AppBar`, `Toolbar` | ロゴおよびナビゲーションメニューを表示。 |
| **Navigation** | `Button (component={Link})` | ページリロードを伴わないSPA遷移を実現。 |
| **Main Content** | `Routes`, `Container` | URLパスに応じて `TodoPage` または `SettingsPage` を動的に表示。 |

## 4. ルーティング定義

URLのパス（Path）と表示されるコンポーネントの対応表です。

| パス | 表示コンポーネント | 説明 |
| --- | --- | --- |
| `/` | `TodoPage` | アプリのホームページ。メインのToDo機能。 |
| `/settings` | `SettingsPage` | アプリの設定画面。 |

## 5. 実装の詳細・ポイント

* **SPA遷移の実現**: MUIの `Button` コンポーネントに `component={Link}` プロパティを渡すことで、Material UIのデザインを維持したまま `react-router-dom` の高速な遷移を可能にしています。
* **レスポンシブ・レイアウト**: `Container` コンポーネントに `sx={{ mt: 4 }}` を設定し、ヘッダーとコンテンツの間に適切な余白（32px相当）を確保しています。
* **拡張性**: 新しいページを追加する際は、`<Routes>` 内に新しい `<Route>` 定義を追加し、ナビゲーションバーにリンクボタンを追加するだけで拡張可能です。

---

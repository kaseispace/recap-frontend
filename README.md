このREADMEは、Qiitaに掲載したポートフォリオの紹介記事と同じ内容です。元の記事は[こちら](URL)でご覧いただけます。

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## サービス概要

![OGP](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3776221/f90c662e-e62f-9799-1b88-ead13d3dfb28.png)

「**ReCap**」は、**教員と学生のための振り返り学習プラットフォーム**です。  
学びを深め、新たな気づきを得るためのサポートを提供します。

### サービスURL

https://www.recaplearning.com/

### 紹介記事

## 機能紹介 - 教員ページ

<table>
  <thead>
    <tr>
      <th>担当授業登録機能</th>
      <th>振り返りプロンプト作成機能</th>
    </tr>
  </thead>
  <tr>
    <td>
      <a href="https://gyazo.com/80f2525f4fe27ef8d31f9ff628aba7f5">
        <img
          src="https://i.gyazo.com/80f2525f4fe27ef8d31f9ff628aba7f5.gif"
          alt="担当授業登録"
          >
      </a>
    </td>
    <td>
      <a href="https://i.gyazo.com/3a499e47e6ae2cef9fdb416539e5e798">
        <img
          src="https://i.gyazo.com/3a499e47e6ae2cef9fdb416539e5e798.gif"
          alt="振り返りプロンプト作成"
          >
      </a>
    </td>
  </tr>
  <tr>
    <td>
      担当授業の登録を行ってください。<br>
      登録後、授業ページにてクラスコードが発行されます。
      このクラスコードを学生に共有してください。
    </td>
    <td>
      学生に振り返らせたいプロンプトの登録をしてください。<br>
      プロンプトは複数登録可能です。<br>
    </td>
  </tr>
</table>

<table>
  <thead>
    <tr>
      <th>振り返りプロンプト公開機能</th>
      <th>振り返りプレビュー機能</th>
    </tr>
  </thead>
  <tr>
    <td>
      <a href="https://i.gyazo.com/89ce35dda119affa9f47f1166d45ee57">
        <img
          src="https://i.gyazo.com/89ce35dda119affa9f47f1166d45ee57.gif"
          alt="振り返りプロンプト公開"
          >
      </a>
    </td>
    <td>
      <a href="https://i.gyazo.com/4fc5ab745b23155d5a8f06c2ae126d0e">
        <img
          src="https://i.gyazo.com/4fc5ab745b23155d5a8f06c2ae126d0e.gif"
          alt="振り返りプレビュー"
          >
      </a>
    </td>
  </tr>
  <tr>
    <td>
      作成したプロンプトを有効化すると、学生に公開されます。<br>
      有効化後、チャットアイコンが表示されます。
    </td>
    <td>
      チャットアイコンをクリックすると、プレビューを確認できます。
    </td>
  </tr>
</table>

<table>
  <thead>
    <tr>
      <th>授業日登録機能</th>
      <th>振り返り履歴閲覧機能</th>
    </tr>
  </thead>
  <tr>
    <td>
      <a href="https://i.gyazo.com/dc30bf77a91796d562f59211527dffd2">
        <img
          src="https://i.gyazo.com/dc30bf77a91796d562f59211527dffd2.gif"
          alt="授業日登録"
          >
      </a>
    </td>
    <td>
      <a href="https://i.gyazo.com/4a60207d13b16257fcc47a532f7bce10">
        <img
          src="https://i.gyazo.com/4a60207d13b16257fcc47a532f7bce10.gif"
          alt="振り返り履歴閲覧"
          >
      </a>
    </td>
  </tr>
  <tr>
    <td>
      授業日の登録を行ってください。<br>
      現在の授業日が終了するまで、次の授業日の登録はできません。<br>
      編集・削除は可能です。
    </td>
    <td>
      受講生が各授業回で行った振り返り内容を閲覧できます。
    </td>
  </tr>
</table>

## 機能紹介 - 学生ページ

<table>
  <thead>
    <tr>
      <th>授業参加機能</th>
      <th>振り返り登録・閲覧機能</th>
    </tr>
  </thead>
  <tr>
    <td>
      <a href="https://i.gyazo.com/2fdb29891a62b79dcc1627a904e9639a">
        <img
          src="https://i.gyazo.com/2fdb29891a62b79dcc1627a904e9639a.gif"
          alt="授業参加"
          >
      </a>
    </td>
    <td>
      <a href="https://i.gyazo.com/712fee94f9e5cb5b9119504603a83329">
        <img
          src="https://i.gyazo.com/712fee94f9e5cb5b9119504603a83329.gif"
          alt="振り返り登録・閲覧"
          >
      </a>
    </td>
  </tr>
  <tr>
    <td>
      教員から共有されたクラスコードを入力してください。<br>
      クラスコードが一致すると、そのクラスへの参加が完了します。
    </td>
    <td>
      チャットアイコンをクリックします。<br>
      振り返りが開始され、指示に従って振り返りを行います。<br>
      全ての振り返りが終了後、振り返り履歴から登録内容を確認できます。また、振り返りに対してフィードバックが返されます。
    </td>
  </tr>
</table>

## こだわりポイント

### 付箋風カードによる振り返り共有

受講生が記入した振り返りの内容を付箋風のカードに表示することで、クラスメートの振り返りを簡単に閲覧できるようにしています。

このデザインには、教室で学生が各々の意見を付箋に書いて模造紙に貼り付け、共有するという情景をシステムに取り入れたいという思いを込めています。視覚的に振り返りを共有することで、他の学生の意見や考えを取り入れることができ、自分自身の学びを深める手助けとなります。

### 振り返りの記入状況の可視化

受講生の振り返り状況を簡単に確認できるよう、記入済みの場合はチェックマーク、未記入の場合はバツ印や黄色の四角で表示しています。
これにより、グラフとアイコンを使って直感的に情報を把握できるようにしました。

![振り返りの可視化.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3776221/0b6deac6-06d0-3993-34af-531aa8e97db0.png)

## 使用技術一覧

#### フロントエンド

- Vue 3.5.11
- Nuxt 3.13.2
- TypeScript 5.6.2
- コード解析/フォーマッター：Nuxt ESLint
- テストフレームワーク：Vitest / Nuxt Test Utils
- UIライブラリ：Tailwind CSS
- 主要パッケージ： VueUse / Nuxt Icon / Nuxt Image

#### バックエンド

- Ruby 3.3.4
- Ruby on Rails 7.1.3
- コード解析/フォーマッター：Rubocop
- テストフレームワーク：RSpec

#### インフラ

- Vercel (フロントエンド)
- Render (バックエンド)

#### CI/CD

- Github Actions

#### 環境構築

- Docker

#### 認証

- Firebase Authentication

#### API

- 学校コード検索 API
- OpenAI API

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

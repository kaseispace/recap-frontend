# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## サービス概要

「ReCap」は、**教員と学生のための振り返り学習プラットフォーム**です。  
学びを深め、新たな気づきを得るためのサポートを提供します。

### 開発背景
私が初めて振り返りの大切さを実感したのは、学生時代の授業で振り返りをする機会があったときです。それまでは、勉強したことをそのままにして、振り返ることなんてほとんどありませんでした。

でも、その授業では、授業後に振り返りをすることが求められていて、私は言われるがままに振り返りを行っていました。当時はその重要性をあまり感じていませんでしたが、後でその振り返りを見返すと、自分の学びをもう一度確認することができ、深く理解する助けとなっていることに気づきました。

特に、テスト対策のときに振り返りがすごく役立ちました。自分ができなかったことに対して振り返ることで、理解が足りなかった部分をはっきりさせて、効率よく復習することができました。

この経験から、**振り返りが学習効果を高めるためにとても重要なツール**であることを痛感しました。

振り返り学習は、学んだことをもう一度見直して、次の学習に活かす大切なプロセスです。でも、多くの学生は勉強したことをそのままにしてしまい、振り返りをすることが少ないのが現実です。

「ReCap」は、そんな学生たちが自分の学びを振り返って、もっと効果的に活用できるように開発しました。

### システムの利用イメージ

![利用イメージ.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3776221/528e2cc0-e3b9-31a2-99a6-f1e80bea5417.png)

**1. 授業開始前（教員向け）**

まず、教員は授業前に以下の準備を行います。

- システムに授業の日付を登録
- 授業内容に合わせた振り返り用のプロンプト（質問）を作成し、生徒に公開

**2. 授業中（学生向け）**
授業が進行する中で、学生は以下の活動を行います。

- 授業中、教員が振り返りの時間を指示します。そのタイミングで、学生は自分の学びを振り返り、システムに記録します。このとき、教員が提示したプロンプト（質問）に沿って内容を入力

**3. 振り返り終了後（教員・学生向け）**
振り返りが完了した後、以下の活動を実施します。

- 教員
    - システムを通じて学生の振り返り状況を確認
- 学生
    - システムからのフィードバックを確認し、必要に応じて振り返り内容を修正します
    - 他の学生の振り返りを参考にし、自分の学びを深める

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

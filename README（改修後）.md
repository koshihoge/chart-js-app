# chart-js-app

## 課題について

1~4 の課題を実装しました。
5~8 の課題もできる限り対応してみました。

課題実装のために用意した GitHub のリポジトリは次になります。
https://github.com/koshihoge/chart-js-app

1. 任意の軸で比較できる機能を追加する
2. 表示するデータを絞り込む機能を追加する
3. シリアルのデータをデータベースから返すようにする
4. シリアルのデータを編集するエンドポイントを設計する（追加する）
5. Vercel や AWS AppRunner などでアプリケーションをホスティングする
6. ESlint、Prettier を追加・設定する
7. ユニットテストを加える
8. コードをリファクタリングする

### 1. 任意の軸で比較できる機能を追加する

アプリケーションを実行して<http://localhost:3000/> を開いてください。
画面下部に X 軸、Y 軸というセレクトボックスを追加しました。
それぞれで以下のプロパティを選択すると選択した軸の表示に変わります。

- calories
- protein
- fat
- sodium
- fiber
- carbo
- sugars
- potass
- vitamins
- shelf
- weight
- cups
- rating

### 2. 表示するデータを絞り込む機能を追加する

X 軸、Y 軸というセレクトボックスの下に mfr, type のセレクトボックスを追加しました。
それぞれで条件を選択すると条件に応じてデータが絞り込まれ表示が変わります。
空欄を選択すると絞り込みが解除されます。

### 3. シリアルのデータをデータベースから返すようにする

http://localhost:3000/api/creals を開いていただくとデータ一覧が表示されます。
cereals.ts にはない id というフィールドが存在しますので、データベースから取得したとこが確認できると思います。
詳細は実装をご覧ください。
ORM は Prisma を使用しました。

### 4. シリアルのデータを編集するエンドポイントを設計する（追加する）

アプリケーションを実行して<http://localhost:3000/docs> を開いてください。

OpenAPI で定義した API 説明ページを開くようしました。
各 API の Send API Request でテストできます。

編集するエンドポイントは、api/cereals の POST メソッドに実装しました。
レスポンスは、編集後のシリアルデータを返すようにしました。

### 5. Vercel や AWS AppRunner などでアプリケーションをホスティングする

App Runner にアプリをホスティングしました。
https://v3dk33fzcr.ap-northeast-1.awsapprunner.com/

App Runnerにデプロイしたソースは、apprunnerブランチのソースとなります。
データをコンテナ内に腹持ちしている状態を解消するため、将来的にデータをDynamoDBから取得して表示しようと思っています。

### 6. ESlint、Prettier を追加・設定する

ESlint, Prettier を設定しました。
詳細はソースコードをご覧ください。

### 7. ユニットテストを加える

API のユニットテストを加えました。
ターミナルから yarn test でテストできます。

### 8. コードをリファクタリングする

型付けに対応するため react-chartjs から react-chartjs-2 に変更しています。

## アプリケーションの実行方法

Docker を用いて実行してください。
VSCode を使用していただき拡張機能の「Dev Containers」を使用してください。

1. Docker 環境の起動 <br>
   1-a. 通常起動する場合： `docker compose up -d` <br>
   1-b. Dev Containers を使う場合： VSCode の画面左下「><」みたいなボタンから「Reopen in Container」を選択 <br>
1. `yarn` を実行
1. `yarn dev` を実行
1. <http://localhost:3000/> を開く

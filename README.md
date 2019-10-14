## Webサイト（管理者用サイト込）
### 概要
- 架空の小さな会社（イベントプロモーション会社想定）のWebサイト  
※使用している画像、動画、テキスト文言等の多くはネット上に存在するものをコピーして使用しているので、サイトを公開することはできない  
- 動画・画像更新、ブログ記事投稿管理、アカウント更新、お問い合わせ管理等の管理者サイト  
### フォアグラウンド
Vue.jsによるSPA
### バックグラウンド
- firebase authentication（匿名認証、google認証）  
- Webサーバ Nginx（別途参照「seventh-project」リポジトリ）  
- Apiサーバ3種  
  - Flask Api（お問い合わせ受付、メール送信用・・・別途参照「eighth-project」リポジトリ）  
  - Django Api（アカウント関連、記事関連処理用・・・別途参照「nineth-project」リポジトリ）  
  - Express Api（画像関連、お問い合わせ履歴取得処理用・・・別途参照「twelfth-project」リポジトリ）  
- DBサーバ  
  - postgreSQL（画像関連、お問い合わせ関連）  
  - MySQL（アカウント関連、記事関連）  
### 画面一覧
- Home画面（動画3種）  
- About画面（企業説明）  
- Project画面（プロジェクト履歴一覧、画像クリックで動画再生）  
- Article画面（記事一覧、アカウント登録者はコメントを投稿可能）  
- Member画面（プロジェクトメンバー紹介）  
- Contact画面（お問い合わせフォーム）  
- 管理画面3種（管理者のみ閲覧可能）  
  - アカウント管理画面（権限変更や削除可能）  
  - プロジェクト画像、動画管理画面（アップロード、ダウンロード、圧縮、タイトル変更等可能）  
  - お問い合わせ履歴閲覧画面  
- Account登録画面2種（ログイン後、閲覧可能）  
  - アカウント登録画面（地域、サムネイル登録）  
  - ブログ記事投稿画面（管理者のみ閲覧可能、TODO（アカウント登録者も投稿可能））  
### 機能一覧
- SPA（VueCLI・VueRouter、Vuex）  
- サーバとapi通信（axios）  
- firebase 匿名認証・google認証機能   
- 権限による画面遷移制御  
- HTTP Live Streamingで動画をダウンロードしながら再生（hls.js）  
- 画像関連、記事等の比較的重いデータは非同期でサーバからダウンロード  
- 記事履歴のページネーション機能（スクロール最下部で追加記事取得）  
- 記事対するコメント投稿機能（アカウント登録者のみ可能）  
- お問い合わせ送信機能  
- お問い合わせ入力値バリデーション機能  
- 記事投稿、編集機能、画像アップロード可（CKEditor.js）  
- Modal機能  
- アカウント権限、削除管理機能  
- 一覧画面ソート機能  
- 検索フィルター機能（日付部分はdate-picker）  
- 画像アップロード、ダウンロード、圧縮、削除機能（画像バイナリデータはDBに格納）  
- 動画アップロード、ファイル分割機能（動画データはファイルとしてサーバに保存）  
- プロジェクトタイトル更新機能  
- お問い合わせ履歴閲覧機能  
- google analytics機能  
- cssフレームワーク利用（Semantic UI）  
- レスポンシブ対応  
- css transition利用  
- 開発にTypeScript、Pug、Scssを採用  
- コンポーネント共通処理部分はMixinを利用  




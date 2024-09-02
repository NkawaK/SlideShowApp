# 構成について

![自己紹介サイト構成図 drawio](https://github.com/user-attachments/assets/b0c68ab0-f0b3-43e3-961e-db4e730f97f4)

筆者のAWS環境にあるS3にビルドしたフロントエンドの静的リソースと画像や音声のデータを保存しています。

ウェブサイトのホスティングにはS3の静的ウェブサイトホスティング機能を使っています。

API Gatewayと統合したLambdaからS3にある画像や音声を取得しています。

# スライドショーの仕様について

画面が最初に表示されたタイミングでAPIを実行して、スライド画像の一覧を取得しています。

音声データの取得はページが切り替えられたタイミングでAPIから取得していますが、<br>
２回目に同じページを開いたタイミングなどではリクエストは行わないようにしています。

Canvaで作ったスライドをエスポートしたところ、<br>
ファイル名がスライドの並び順に1.jpeg、2.jpegのように連番になっていたので、<br>
音声ファイルもそれと同様、連番で名前を付けています。<br>
現在開いているページ番号をポストしてスライドに対応する音声を特定しています。

スライドを進めたり、戻したりするボタンのアニメーションはframer-motionを使って動きを付けました。


# 工夫点について

## バックエンド
クラウド側に構築しているAPIはAWS CDKで構築し、<br>
すべてTypeScriptで管理できるようにしました。

スライド画像を取得する際に、Promise.allで非同期処理を並列で行えるようにしました。<br>
(API/lambda/getPictures/index.ts参照)

## フロントエンド
ページを移動した際に、画像をスライドさせるアニメーションを付けました。<br>
アニメーションはframer-motionを使いました。

fetchでデータを取得すると、結果がanyになってしまうので、<br>
fetch処理のラッパーを呼び出すことで戻り値に型を設定できるようにしました。

コンポーネントの再レンダリングに必要なデータはuseStateを使い、<br>
そうでないデータはuseRefを使うように区別しています。

スライド画像の取得にSuspenseを使用しました。

# 構成について

![自己紹介サイト構成図 drawio](https://github.com/user-attachments/assets/b0c68ab0-f0b3-43e3-961e-db4e730f97f4)

筆者のAWS環境にあるS3にビルドしたフロントエンドの静的リソースと画像や音声のデータを保存しています。

ウェブサイトのホスティングにはS3の静的ウェブサイトホスティング機能を使っています。

API Gatewayと統合したLambdaからS3にある画像や音声を取得しています。

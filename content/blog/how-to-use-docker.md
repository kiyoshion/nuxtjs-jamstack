---
title: 【2021/5】Docker勉強するならこれだけでよかった。
description: これからDockerを勉強しようとしている方へ。Udemyのかめさんの講座14.5時間をこなせば、個人開発がきっと捗ることでしょう。
---

Docker勉強するなら「<a href="https://www.udemy.com/course/aidocker/" target="_blank">米国AI開発者がゼロから教えるDocker講座</a>」これだけ。この講座で”何がわかって、何ができるか”を自分用のメモと合わせてアウトラインを残しておきます。これからDokcer勉強する方は上記の講座1本で事足りるかと。

ちなみに、以下の書籍と講座もやりましたがぴえんでした。

1. 「プログラマのためのDocker教科書第2版」
2. 「米シリコンバレーDevOps監修！超Docker完全入門(2020)【優しい図解説とハンズオンLab付き】」
<!--more-->

## Why Docker？

1. デプロイ作業を効率化できる
2. ホスティグの移動が楽になる
3. テスト環境と本番環境の構築が楽になる

## DockerとはLinuxのコンテナ技術

## Dockerを使ってみる

1. docker login
2. docker pull [image]
3. docker images

### コンテナを作ってみる

1. docker run [image]
2. docker ps

テスト環境の場合、コンテナを作ってコマンドを確認したら削除するという使い方をすることが多い。

### コマンドを指定してコンテナを作る

1. docker run -it ubuntu bash

### コンテナを更新する

普通はpullしたimageをそのまま使うのではなく、pythonを入れたりしたimageを使う。新しいimage layerを追加していく。

Docker imageを更新する方法は2通りある。一般的にDocker fileを更新する。

1. Docker imageを更新する
2. Docker fileを更新する

#### Docker imageからimageを更新する

1. docker run [image]
2. touch [file]
3. exit

### コンテナを再起動する

1. docker restart [container]
2. docker exec [container] [command]
3. detach: ctrl+p+q

#### exitとdetachの違い

exit・・・プロセスをころす
detach・・・プロセスを残す
attach・・・もとのプロセスで入れる

1. docker attach [container]

### 更新したimageを新しいimageに保存する

1. docker restart [container]
2. docker exec [container] [command]
3. exit
4. docker commit [container] [new image]

### DockerHubにカスタマイズしたimageを保存する

#### DockerHubにリポジトリを作成する

#### image名をリポジトリ名に合わせる

1. docker tag [source] [target]
2. docker tag ubuntu:updated [username]/my-first-repo

#### DockerHubにpushする

オリジナルから更新したlayerだけpushされる。

1. docker images
2. docker push [image]


## CLCIとはなにか？

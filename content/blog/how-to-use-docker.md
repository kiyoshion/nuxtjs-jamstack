---
title: Dockerするならこれだけでよかった。
description: これからDockerを勉強しようとしている方。Udemyのかめさんの講座14.5時間をこなせば、個人開発がきっと捗ることでしょう。
---

Docker勉強するなら「<a href="https://www.udemy.com/course/aidocker/" target="_blank">米国AI開発者がゼロから教えるDocker講座</a>」これだけ。この講座で”何がわかって、何ができるか”を自分用のメモと復習用の概要として残しておきます。これからDokcer勉強する方はこの講座14.5時間でDockerであれこれできるようになるかと思います。ちなみに、以下の書籍と講座もやりましたがぴえんでしたのでお知らせします。

1. 「プログラマのためのDocker教科書第2版」
2. 「米シリコンバレーDevOps監修！超Docker完全入門(2020)【優しい図解説とハンズオンLab付き】」
<!--more-->

## Why Docker？

1. デプロイ作業を効率化できる
2. ホスティグの移動が楽になる
3. テスト環境と本番環境の構築が楽になる

## Linuxの基礎

### DockerとはLinuxのコンテナ技術

## Dockerを使ってみる

```bash
docker login
docker pull [image]
docker images
```

### コンテナを作ってみる

テスト環境の場合、コンテナを作ってコマンドを確認したら削除するという使い方をすることが多い。

```bash
docker run [image]
docker ps
```

### コマンドを指定してコンテナを作る

```bash
docker run -it ubuntu bash
```

### コンテナを更新する

一般的にpullしたimageをそのまま使うのではなく、pythonを入れたりして更新したimageを使う。既存のimageに新しいimage layerを追加していく。Docker imageを更新する方法は2通りあり、一般的にDocker fileを更新して作成する。

1. Docker imageを更新する
2. Docker fileを更新する

#### Docker imageからimageを更新する

```bash
docker run [image]
touch [file]
exit
```

### コンテナを再起動する

```bash
docker restart [container]
docker exec [container] [command]
detach: ctrl+p+q
```

#### exitとdetachの違い

|command|note|
|---|---|
|exit|プロセスをころす|
|detach|プロセスを残す|
|attach|もとのプロセスに入る|

```bash
docker attach [container]
```

### 更新したimageを新しいimageに保存する

```bash
docker restart [container]
docker exec [container] [command]
exit
docker commit [container] [new image]
```

### DockerHubにカスタマイズしたimageを保存する

#### DockerHubにリポジトリを作成する

#### image名をリポジトリ名に合わせる

```bash
docker tag [source] [target]
docker tag ubuntu:updated [username]/my-first-repo
```

#### DockerHubにpushする

オリジナルのimageから更新したlayerだけpushされる。

```bash
docker images
docker push [image]
```

### DockerHubからimageをpullする

同じimageはpullできないのでホストにある場合は削除しておく。

```bash
docker rmi [image]
docker images
docker pull [image]
dcoker run -it [image] bash
```

## Dockerの動きをもう少し詳細に理解する

必要な環境を構築するには、どんなcontaierが必要なのか？を理解する。

### docker runは何をしているのか

dockerのcontainerをcreateしている。

run = create + start

create -> containerを起動してデフォルトコマンドを実行してexitする
start ->

```bash
docker run [image]
docker create [image]
dcoker ps -a
docker start [container]
docker ps -a
```

### コマンドを上書きする

### -itって何してるの？

```bash
docker run -it ubuntu bash
```

-i: インプット可能 Hostからcontainerに入力チャネルを開く
-t: 表示が綺麗になる prettyにする

### コンテナの削除

業務ではexitしたcontainerに再度何かすることはあまりない。

```bash
docker rm [container]
docker stop [container]
docker system prune # stopしているcontainerを全削除
```

### コンテナのファイルシステムの独立性

docker run -it ubuntu bashするたびに新しいcontainerが作られる -> 独立性

### コンテナに名前をつける

```bash
docker run --name [name] [image]
```

### detached mode vs foreground mode

```bash
docker run -d [image] # コンテナをバックグラウンドで動かす
docker run --rm [image] # コンテナをexit後に削除する
```


## CLCIとはなにか？

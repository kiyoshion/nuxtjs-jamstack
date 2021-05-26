---
title: Dockerするならこれだけでよかった。
description: これからDockerを勉強しようとしている方。Udemyのかめさんの講座14.5時間をこなせば、個人開発がきっと捗ることでしょう。
---

Dockerを勉強するならUdemyの「<a href="https://www.udemy.com/course/aidocker/" target="_blank">米国AI開発者がゼロから教えるDocker講座</a>」。小野田の場合、これだけでOKでした。この講座で”何がわかって、何ができるか”を復習用のメモとして残しておきます。これからDokcerを勉強する方はこの講座の14.5時間で、Dockerを使ってあれこれできるようになるかと思います。ちなみに、以下の書籍と講座もやりましたが、小野田にはぴえんでした。

1. 「プログラマのためのDocker教科書第2版」
2. 「米シリコンバレーDevOps監修！超Docker完全入門(2020)【優しい図解説とハンズオンLab付き】」
<!--more-->

## 小野田ができるようになったこと

1. ごちゃごちゃしたサーバをVPSで1本化(WordPress, Laravel)
2. 他の人が作ったDockerfileやdocker-compose.ymlがスラスラ読める
3. Dockerは個人開発者ならマストスキル(と謳える)

## Why Docker？

1. デプロイ作業を効率化できる
2. ホスティグの移動が楽になる
3. テスト環境と本番環境の構築が楽になる

## Dockerを使ってみる

```bash[bash]
docker login
docker pull [image]
docker images
```

### コンテナを作ってみる

テスト環境の場合、コンテナを作ってコマンドを確認したら削除するという使い方をすることが多い。

```bash[bash]
docker run [image]
docker ps
```

### コマンドを指定してコンテナを作る

```bash[bash]
docker run -it ubuntu bash
```

### コンテナを更新する

一般的にpullしたimageをそのまま使うのではなく、pythonを入れたりして更新したimageを使う。既存のimageに新しいimage layerを追加していく。Docker imageを更新する方法は2通りあり、一般的にDocker fileを更新して作成する。

1. Docker imageを更新する
2. Docker fileを更新する

#### Docker imageからimageを更新する

```bash[bash]
docker run [image]
touch [file]
exit
```

### コンテナを再起動する

```bash[bash]
docker restart [container]
docker exec [container] [command]
detach: ctrl+p+q
```

#### exitとdetachの違い

<div class="c-table">

|command|note|
|---|---|
|exit|プロセスをころす|
|detach|プロセスを残す|
|attach|もとのプロセスに入る|

</div>

```bash[bash]
docker attach [container]
```

### 更新したimageを新しいimageに保存する

```bash[bash]
docker restart [container]
docker exec [container] [command]
exit
docker commit [container] [new image]
```

### DockerHubにカスタマイズしたimageを保存する

#### DockerHubにリポジトリを作成する

#### image名をリポジトリ名に合わせる

```bash[bash]
docker tag [source] [target]
docker tag ubuntu:updated [username]/my-first-repo
```

#### DockerHubにpushする

オリジナルのimageから更新したlayerだけpushされる。

```bash[bash]
docker images
docker push [image]
```

### DockerHubからimageをpullする

同じimageはpullできないのでホストにある場合は削除しておく。

```bash[bash]
docker rmi [image]
docker images
docker pull [image]
dcoker run -it [image] bash
```

## Dockerの動きを理解する

必要な環境を構築するには、どんなcontaierが必要なのか？を理解する。

### docker runは何をしているのか

dockerのcontainerをcreateとstartしている。

run = create + start

<div class="c-table">

|command|note|
|---|---|
|create|containerを作る|
|start|起動してデフォルトコマンドを実行してexitする|

</div>

```bash[bash]
docker run [image]
docker create [image]
dcoker ps -a
docker start [container]
docker ps -a
```

### コマンドを上書きする

### -itって何してるの？

```bash[bash]
docker run -it ubuntu bash
```

<div class="c-table">

|option|note|
|---|---|
|-i|インプット。Hostからcontainerに入力チャネルを開く。|
|-t|表示が綺麗になる。prettyになる。|

</div>

### コンテナの削除

業務ではexitしたcontainerに再度何かすることはあまりない。

```bash[bash]
docker rm [container]
docker stop [container]
docker system prune # stopしているcontainerを全削除
```

### コンテナのファイルシステムの独立性

docker run -it ubuntu bashするたびに新しいcontainerが作られる -> 独立性

### コンテナに名前をつける

```bash[bash]
docker run --name [name] [image]
```

### detached mode vs foreground mode

```bash[bash]
docker run -d [image] # コンテナをバックグラウンドで動かす
docker run --rm [image] # コンテナをexit後に削除する
```

## Dockerfile

### Dockerfileを作る

```dockerfile[Dockerfile]
FROM ubuntu:latest
RUN touch test
```

### DockerfileからDocker imageを作る

一般的にDockerfileからDocker imageを作る。どんなコマンドを実行したかなど、Dockerfileの中身を見ればわかる。

```bash[bash]
docker build [directory]
docker images
docker build -t [name] [directory]
```

## Dockerfileの書き方

Docker imageのLayerを最小限にする。

1. Layerを作るのはRUN, COPY, ADDの3つ
2. コマンドを&&でつなげる
3. バックスラッシュで\改行する

Ubuntuでパッケージ管理ツール(apt-get or apt)を最新版にして、パッケージをインストールしていく。

```bash[bash]
apt update
apt install [pakage]
```

最終的にRUNは1行に収める。編集中はキャッシュを使う。

```dockerfile[Dockerfile]
FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
  curl \
  nginx
```

<div class="c-table">

|instruction|note|
|---|---|
|FROM|ベースとなるイメージを指定する。|
|RUN|RUN毎にLayerが作られる。|
|CMD|コンテナのデフォルトのコマンドを指定する。基本的にDockerfileの最後に書く。Layerは作られない。|
|COPY|build contextにあるファイルをcontainerに持っていける。Djangoなどのrequirements.txtなど。|
|ADD|COPYより多機能。tarの圧縮ファイルを解凍したい時。|
|ENTRYPOINT|CMDをアドバンテージに使う。|
|ENV|環境変数を設定する。|
|WORKDIR|作業ディレクトリを指定する。|

</div>

## docker buildを詳しく

build contextをdocker daemonに渡す。

### build context

Dockerfileを配置したディレクトリのこと。contextとは「状況」「環境」という意味。buildに使わないファイルはbuild contextに入れないようにする。ADDやCOPYでbuild contextにあるファイルをimageに持っていける。

### COPY

Hostからcontainerにファイルやフォルダを渡す時に使う。例として、requirements.txtなどをCOPYしてcontainerに持っていく。

```bash[bash]
touch something
docker build [build context]
docker run -it [image] bash
ls
```

### ADD

COPY+解凍。

```bash[bash]
mkdir sample_dir
echo 'hello' > hello
tar -cvf compressed.tar sample_dir
docker build [build context]
docker run -it --rm [image] bash
cat /sample_dir/hello
```

### Dockerfileがbuild contextに入っていないときは

開発用のDockerfile.devと本番用のDockerfileを分けるときなど。

```bash[bash]
docker build -f [dockerfilename] [build context]
```

### CMD vs ENTRYPOINT

ENTRYPOINTもデフォルトのコマンドを指定できる。RUNのときに上書きできない。containerをコマンドとして使いたい時に使う。

### ENV

環境変数を設定する。OS共通で使える変数。PATHを通すときなどに使う。

```bash[bash]
ENV [key] [value]
```

### WORKDIR

Docker instructionの実行ディレクトリを変更する。デフォルトではRUNはrootディレクトリで実行される。絶対パスで指定する。

```dockerfile[Dockerfile]
FROM ubuntu:latest
RUN mkdir sample
WORKDIR /sample
RUN touch test
```

## HostとContainerの関係

### マウント -v

```bash[bash]
-v [host]:[container]
```

HostのファイルとContainerのファイルをマウントする。Containerにファイルを置くのではなくHostに置いておく。Containerは他の人と共有するから綺麗にしておく。

```bash[bash]
mkdir mounted_folder
touch mounted_foler/file_at_host
docker build .
docker run -it -v ~/Docker/mounted_foler:/new_dir [image] bash
ls /new_dir
```

### アクセス権限 -u

```bash[bash]
-u [userId]:[groupId]
```

containerを起動するときデフォルトではrootユーザ。ユーザを指定して実行する。ハードコーディングするのではなくコマンドでidを取得する。

```bash[bash]
docker run -it -u $(id -u):$(id -g) -v ~/Docker:created_in_run [image] bash
```

### ポート -p

portをpublishする。

```bash[bash]
-p [host_port]:[container_port]
```

```bash[bash]
docker run -it -p 8888:8888 --rm jupyter/datascience-notebook bash
jupyter notebook
# ブラウザでlocalhost:8888にアクセスする
```

### --cpus [CPU] --memory [byte]

MacでのCPUやメモリを確認する。

```bash[bash]
sysctl -n hw.physicalcpu_max
sysctl -n hw.logicalspu_max
sysctl hw.memsize
```

```bash[bash]
docker run -it --rm --cpus 4 --memory 2g ubuntu bash
docker ps
docker inspect [container]
docker inspect [container] | grep -i cpu
```

## DockerでWebアプリ開発環境を構築

鉄則：1つのコンテナに1つのアプリケーション

### RailsのDockerfileを作る

```dockerfile[Dockerfile]
FROM ruby:2.5
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    postgresql-client \
    yarn
WORKDIR /product-register
COPY Gemfile Gemfile.lock /product-register/
RUN bundle install
```

```ruby[Gemfile]
source 'https://rubygems.org'
gem 'rails', '~>5.2'
```

```bash[bash]
mkdir product-register && cd product-register
touch Dockerfile
touch Gemfile Gemfile.lock
```

## docker-composeを使う

1. docker runコマンドが長くなるとき
2. 複数のcontainerをまとめて起動するとき

```bash
YAML = YAML ain't markup language
```

```bash[bash]
docker run -it -v $(pwd):/product-register -p 3000:3000 [image] bash
```

このコマンドをdocker-compose.ymlで書くと以下になる。開発者によって作業ディレクトリは異なるのでマウントは相対パス(current dir)で指定する。

```yml[docker-compose.yml]
version: '3'

services:
  web:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - '.:/product-register'
    tty: true
    stdin_open: true
```

### docker-composeで起動する

```bash[bash]
docker-compose build # docker build .
docker-compose up # docker run [image]
docker-compose ps # docker ps
docker-compose exec [service] # docker exec [container]

# 便利コマンド
docker-compose up --build # buildしてrun
docker-compose down # stopしてrm
```

## Railsアプリの開発環境をdockerで構築する

### Railsのセットアップ

```bash[bash]
docker-compose ps
docker-compose exec web bash
rails new . --force --database=postgresql --skip-bundle
exit
docker-compose down
docker-compose up --build -d
docker-compose exec web bash
rails s -b 0.0.0.0 # railsのローカルサーバを起動
```

### DBのセットアップ

```bash[bash]
docker-compose exec web bash
rails db:create
exit
vim config/database.yml
vim docker-compose.yml
```

database.ymlを編集する。

```yml[config/database.yml]
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  user: postgres
  port: 5432
  password: <%= ENV.fetch("DATABASE_PASSWORD") %>
  # For details on connection pooling, see Rails configuration guide
  # http://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

docker-compose.ymlにDBのserviceを追加する。

```yml[docker-compose.yml]
version: '3'

volumes:
  db-data:

services:
  web:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - '.:/product-register'
    environment:
      - 'DATABASE_PASSWORD=postgres'
    tty: true
    stdin_open: true
    depends_on: # dbのserviceを作ってからwebをrunする
      - db
    links: # webからdbにアクセスできるようにする
      - db
  db:
    image: postgres
    volumes:
      - 'db-data:/var/lib/postgresql/data'
    # dbがUpにならない場合、以下を追記
    environment:
      - 'POSTGRES_USER=postgres'
      - 'POSTGRES_PASSWORD=postgres'
```

### Railsのアプリ作成

```bash[bash]
docker-compose up -d
docker-compose exec web bash
rails db:create
rails g scaffold product name:string price:integer vendor:string
rails db:migrate
rails s -b 0.0.0.0
vim config/routes.rb
```

```ruby[config/routes.rb]
root 'products#index'
```

## CICDとはなにか？

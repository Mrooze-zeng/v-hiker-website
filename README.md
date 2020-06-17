## 目录结构
- client

  web前端工程项目

- database

  本地数据库备份

- dist

  工程最终生成的文件

- nginx

  服务器端nginx配置

- server

  服务器接口工程项目

- app-tool.sh

  本地项目启动shell
  ```
  Version: v1.0.0

  Usage: ./app.sh [COMMAND]

  Commands:
    ./app.sh push     Build project and push to server
    ./app.sh tar      tar the project
    ./app.sh build    Build project
    ./app.sh remove   Remove dist folder
    ./app.sh start    Build project and test project locally
    ./app.sh dev      Start server locally
  Options
    -h,--help         Display help information
    -v,--version      Output version of ./app.sh
  ```

- docker-compose.local.yml

  本地docker-compose 配置

- docker-compose.prod.yml

  服务端docker-compose配置

- dockerfile

  nodejs docker配置

- server-runner.sh

  服务器自动更新项目配置
  服务器存放位置为tmp/app.sh

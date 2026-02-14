# 🐳 Docker 入门与常用命令手册

面向零基础、事无巨细的 Docker 与容器化查漏补缺手册。学完容器后想了解**多容器编排**，可继续看 [Kubernetes 入门](/docker/Kubernetes入门)。

## 文档链接

| **需求场景** | **对应资源** |
| ----------- | ------------- |
| **官方文档** | [Docker Docs](https://docs.docker.com/) |
| **Dockerfile 参考** | [Dockerfile reference](https://docs.docker.com/engine/reference/builder/) |
| **Compose 文件参考** | [Compose file reference](https://docs.docker.com/compose/compose-file/) |
| **Docker Hub** | [hub.docker.com](https://hub.docker.com/) 镜像仓库 |

---

## 一、Docker 是什么

### 1.1 核心直觉

- **Docker**：用来创建、运行、分发**容器 (Container)** 的平台。
- **容器**：在一个隔离环境里跑应用，自带依赖（如某个版本的 Python、系统库），与宿主机和其他容器隔离；**不是**完整虚拟机，而是复用宿主机内核的轻量隔离。
- **镜像 (Image)**：容器的「模板」——只读的一层层文件系统，用来创建容器实例。

### 1.2 镜像 vs 容器

| 概念 | 类比 | 说明 |
|------|------|------|
| **镜像** | 安装包 / 模具 | 只读模板，可多次用来创建容器 |
| **容器** | 安装好的程序 / 成品 | 由镜像创建，可运行、可停止、可删除；修改容器不会改变镜像 |

- **关系**：一个镜像可以创建多个容器；容器删掉后，镜像还在，可以再建新容器。

### 1.3 安装 Docker（简要）

- **Linux**：按发行版装 Docker Engine（如 Ubuntu：`apt install docker.io` 或官方脚本）。
- **Mac/Windows**：安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。
- **验证**：`docker run hello-world` 能拉镜像并跑出一个容器即表示安装成功。

---

## 二、镜像：拉取、查看、删除

### 2.1 拉取镜像：`docker pull`

- **语法**：`docker pull [选项] 镜像名[:标签]`
- **默认**：不写标签则用 `latest`。

```bash
docker pull nginx
docker pull nginx:1.25
docker pull redis:7-alpine
```

- **镜像名**：通常来自 Docker Hub，格式 `仓库/名字:标签`，如 `library/nginx`（`library` 可省略）。

### 2.2 查看本地镜像：`docker images`

- **命令**：`docker images` 或 `docker image ls`
- **列**：REPOSITORY、TAG、IMAGE ID、CREATED、SIZE。

```bash
docker images
docker images nginx
```

### 2.3 删除镜像：`docker rmi`

- **语法**：`docker rmi 镜像ID或名[:标签]`
- **注意**：若有容器正在用该镜像（哪怕已停止），需先删容器再删镜像；强制删镜像可用 `-f`（不推荐优先用）。

```bash
docker rmi nginx:latest
docker rmi abc123def456
```

### 2.4 清理未用镜像：`docker image prune`

- **`docker image prune`**：删掉没有被任何容器引用的镜像（悬空镜像）。
- **`docker image prune -a`**：删掉所有未被容器使用的镜像，慎用。

---

## 三、容器：运行、查看、进入、删除

### 3.1 运行容器：`docker run`

- **语法**：`docker run [选项] 镜像 [命令] [参数...]`
- **常用选项**：

| 选项 | 含义 |
|------|------|
| `-d` | 后台运行（detach） |
| `-it` | 分配终端并保持交互（常与 `/bin/bash` 一起用） |
| `--name 名字` | 给容器起名，便于后续操作 |
| `-p 宿主机端口:容器端口` | 端口映射 |
| `-e KEY=value` | 环境变量 |
| `-v 宿主机路径:容器路径` | 挂载目录/卷 |
| `--rm` | 容器退出后自动删除（适合临时跑一下） |

```bash
docker run -d --name my-nginx -p 8080:80 nginx
docker run -it --rm ubuntu /bin/bash
docker run -e MYSQL_ROOT_PASSWORD=secret -d mysql:8
```

- **核心直觉**：不写 `-d` 时，容器在前台跑，关掉终端或 Ctrl+C 会停掉容器（除非用 `-d` 或已 detach）。

### 3.2 查看容器：`docker ps`、`docker ps -a`

| 命令 | 含义 |
|------|------|
| `docker ps` | 只显示**正在运行**的容器 |
| `docker ps -a` | 显示所有容器（含已停止） |

- **列**：CONTAINER ID、IMAGE、COMMAND、STATUS、PORTS、NAMES。

### 3.3 启停与删除：`start`、`stop`、`restart`、`rm`

| 命令 | 含义 |
|------|------|
| `docker start 容器` | 启动已存在的容器 |
| `docker stop 容器` | 停止容器（发 SIGTERM，等待一段时间再 SIGKILL） |
| `docker restart 容器` | 重启 |
| `docker rm 容器` | 删除已停止的容器（运行中需先 stop 或 `docker rm -f`） |

```bash
docker stop my-nginx
docker start my-nginx
docker rm my-nginx
```

- **批量**：`docker rm $(docker ps -aq)` 删除所有已停止容器；**慎用**，先 `docker ps -a` 确认。

### 3.4 进入运行中的容器：`docker exec`

- **语法**：`docker exec [选项] 容器 命令 [参数...]`
- **常用**：在容器里开一个 shell，方便排查或临时操作。

```bash
docker exec -it my-nginx /bin/sh
docker exec my-nginx nginx -s reload
```

- **注意**：容器内可能没有 bash，只有 `sh`，写 `/bin/sh` 更通用。

### 3.5 查看日志：`docker logs`

- **语法**：`docker logs [选项] 容器`
- **常用选项**：`-f` 持续跟踪（类似 `tail -f`），`--tail 100` 只看最后 100 行。

```bash
docker logs my-nginx
docker logs -f --tail 50 my-nginx
```

---

## 四、数据持久化：卷与挂载

### 4.1 核心直觉

- 容器默认是**无状态**的：容器删掉，里面的文件改动就没了。
- 要把数据留在宿主机，用**卷 (Volume)** 或**绑定挂载 (Bind Mount)**。

### 4.2 卷 (Volume)

- **特点**：由 Docker 管理，存在宿主机某目录（如 `/var/lib/docker/volumes/...`），与容器生命周期解耦。
- **创建**：`docker volume create 卷名`
- **挂载**：`docker run -v 卷名:容器内路径 ...`

```bash
docker volume create mydata
docker run -d -v mydata:/app/data --name app myimage
```

- **查看**：`docker volume ls`、`docker volume inspect 卷名`
- **删除**：`docker volume rm 卷名`（需没有容器在用）

### 4.3 绑定挂载 (Bind Mount)

- **特点**：直接把宿主机上的**某个目录**挂进容器，改容器里就是改宿主机，适合开发时挂代码。
- **写法**：`-v 宿主机绝对路径:容器内路径`

```bash
docker run -d -v /home/user/project:/app --name dev myimage
```

- **注意**：路径必须是宿主机上的绝对路径；Windows 下用 `C:\path` 等形式。

### 4.4 只读挂载

- **只读**：在挂载路径后加 `:ro`，如 `-v mydata:/data:ro`，容器内不能写 `/data`。

---

## 五、网络：端口与容器互通

### 5.1 端口映射

- **`-p 宿主机端口:容器端口`**：把容器内端口暴露到宿主机，如 `-p 8080:80` 表示访问宿主机 8080 即访问容器 80。
- **多端口**：多个 `-p`，如 `-p 8080:80 -p 8443:443`。

```bash
docker run -d -p 8080:80 nginx
# 本机浏览器访问 http://localhost:8080
```

### 5.2 容器间通信：同一网络

- 默认同一宿主机上的容器可以通过**容器名**互相访问（若在同一自定义网络中）。
- **创建网络**：`docker network create 网络名`
- **运行容器时加入**：`docker run --network 网络名 ...`

```bash
docker network create mynet
docker run -d --network mynet --name web nginx
docker run -d --network mynet --name db mysql
# 在 web 容器里可通过主机名 db 访问 MySQL
```

- **默认网络**：不指定时容器在 `bridge` 网络，按容器名解析需要自定义网络才稳定。

---

## 六、Dockerfile：自己构建镜像

### 6.1 核心概念

- **Dockerfile**：文本文件，一行行指令，描述如何从基础镜像一步步构建出新镜像。
- **构建**：`docker build -t 镜像名:标签 构建上下文目录`

### 6.2 常用指令

| 指令 | 含义 |
|------|------|
| `FROM 镜像` | 基础镜像，必须放第一行 |
| `WORKDIR 路径` | 后续指令的工作目录，相当于 cd |
| `COPY 源 目标` | 把构建上下文中的文件拷进镜像 |
| `ADD 源 目标` | 类似 COPY，支持 URL 和自动解压（一般用 COPY 更清晰） |
| `RUN 命令` | 在镜像里执行命令（每行一层，尽量合并减少层数） |
| `ENV KEY=value` | 设置环境变量 |
| `EXPOSE 端口` | 声明容器监听端口（不自动映射，仅文档作用） |
| `CMD ["可执行","参数"]` | 容器**启动时**默认执行的命令（可被 `docker run` 末尾参数覆盖） |
| `ENTRYPOINT ["可执行"]` | 容器入口，与 CMD 配合；`docker run` 末尾参数会传给 ENTRYPOINT |

### 6.3 简单示例

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

- **构建**：在 Dockerfile 所在目录执行 `docker build -t myapp:1.0 .`（最后的 `.` 是构建上下文）。

### 6.4 最佳实践（入门必知）

- **基础镜像**：尽量用带 `-alpine` 或 `-slim` 的官方镜像，体积小。
- **层数**：把变化少的放前面（如先 COPY requirements 再 pip install，再 COPY 代码），利于缓存。
- **不要**：在 Dockerfile 里写密码、密钥；用 `.dockerignore` 排除无关文件，加快构建、减小镜像。

---

## 七、Docker Compose：多容器编排

### 7.1 适用场景

- 一个应用需要**多个容器**（如 Web + 数据库 + Redis）时，用 Compose 在一个配置文件里定义并一起启停。

### 7.2 基本用法

- **文件**：默认名 `docker-compose.yml`（或 `compose.yaml`），放在项目目录。
- **启动**：`docker compose up -d`（或旧版 `docker-compose up -d`）
- **停止**：`docker compose down`
- **查看**：`docker compose ps`、`docker compose logs -f`

### 7.3 简单 compose 示例

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: app
    volumes:
      - dbdata:/var/lib/mysql
    restart: unless-stopped

volumes:
  dbdata:
```

- **说明**：`services` 下每个服务一个容器；`volumes` 里写的卷名由 Compose 自动创建和管理。

### 7.4 常用字段

| 字段 | 含义 |
|------|------|
| `image` | 使用的镜像 |
| `build` | 用 Dockerfile 构建，如 `build: .` |
| `ports` | 端口映射，同 `-p` |
| `environment` | 环境变量 |
| `volumes` | 卷或绑定挂载 |
| `depends_on` | 启动顺序依赖（不保证服务已就绪，仅顺序） |
| `restart` | 重启策略，如 `unless-stopped` |

---

## 八、常用场景速查

### 8.1 跑一个临时环境（用完即删）

```bash
docker run -it --rm ubuntu:22.04 /bin/bash
```

### 8.2 把当前目录当静态网站发布

```bash
docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html:ro nginx:alpine
```

### 8.3 查看容器占用的资源

```bash
docker stats
docker stats --no-stream
```

### 8.4 导出 / 导入镜像

```bash
docker save -o myimage.tar myimage:tag
docker load -i myimage.tar
```

### 8.5 清理未用资源

```bash
docker system prune      # 未用容器、网络等
docker system prune -a   # 还包括未用镜像，慎用
```

---

## 九、常见坑与安全建议

- **不要用 root 跑业务**：Dockerfile 里用 `USER` 指定非 root 用户；必要时再配合只读根文件系统、去掉多余能力。
- **不要把宿主机敏感目录随便挂进去**：`-v /etc:/etc` 之类会放大风险。
- **镜像来源**：优先用官方或可信镜像，自己扫漏洞；不要随意 `docker run` 来路不明的镜像。
- **密码与密钥**：用环境变量或 Docker Secrets（Compose 或 Swarm），不要写死在 Dockerfile 或 compose 文件里提交到仓库。
- **数据备份**：重要数据放在卷或绑定挂载，并定期备份宿主机上的卷数据。

本手册覆盖从零到日常使用 Docker 与 Compose 所需的大部分概念与命令，可按章节查阅；更细的选项请用 `docker 命令 --help` 或 [官方文档](https://docs.docker.com/)。

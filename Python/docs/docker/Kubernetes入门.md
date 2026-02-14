# Kubernetes 入门（零基础版）

面向**完全没接触过 K8s 的小白**：先建立直觉，再动手。不要求你有运维或云经验，只要会一点 Docker 或「在电脑上跑程序」即可。

---

## 一、Kubernetes 是什么（用一句话说）

**Kubernetes**（常简写 **K8s**）是一套**帮你在一堆机器上自动跑很多容器**的系统。

- 你只要告诉它：「我要跑 3 个 nginx、2 个我的后端服务，并且要有一个对外的入口。」
- 它会负责：把这些容器分配到哪些机器上、挂了就重启、加机器就多跑几个、给你一个固定地址访问——你不用自己 SSH 到每台机器上去敲命令。

所以：**Docker 负责「造出一个一个容器」；Kubernetes 负责「在好多机器上管这些容器怎么跑、跑几个、怎么联网」。**

---

## 二、为什么需要 Kubernetes？（小白视角）

| 场景 | 没有 K8s | 有 K8s |
|------|-----------|--------|
| 只有 1 台机器、1 个程序 | 直接跑或用 Docker 就行 | 用 K8s 有点重，可选 |
| 多台机器、多个服务、要扩容、要少宕机 | 自己要写脚本、改 Nginx、记每台机器 IP | 用 YAML 描述「要什么」，K8s 帮你落地 |
| 做 AI/RAG、用 MinIO、etcd 等，文档里说「可部署在 K8s」 | 不知道从哪下手 | 先会概念和基本命令，再按文档一步步来 |

**小结**：你现在不会 K8s 也没关系；先知道它是「管容器的管家」，等真要上多机、上云再学不迟。本文帮你把「第一印象」和「最常用操作」建立起来。

---

## 三、核心概念（先懂 4 个就够）

不用一次全懂，有个印象即可，后面用到再回来看。

### 3.1 Pod

- **是什么**：K8s 里**最小部署单元**，通常 = 一个或多个跑在一起的容器（多数情况是 1 个容器 1 个 Pod）。
- **小白记法**：一个 Pod ≈ 「一个正在跑的容器」+ 一点 K8s 给的元数据（名字、标签等）。

### 3.2 Deployment（部署）

- **是什么**：描述「我要跑什么镜像、跑几份、用什么配置」的**期望状态**。K8s 会尽量让实际状态和它一致（少了自己拉起来，多了关掉）。
- **小白记法**：Deployment = 「我要 3 个 nginx」这句话的书面版；你改数字，K8s 就帮你扩缩容。

### 3.3 Service（服务）

- **是什么**：给一堆 Pod 一个**固定的访问入口**（一个名字 + 集群内 IP）。不管 Pod 在哪台机器、重启后 IP 怎么变，别的程序只要访问这个 Service 就行。
- **小白记法**：Service = 给「很多个 Pod」起的一个统一门牌号。

### 3.4 Namespace（命名空间）

- **是什么**：把集群里的资源**分区**，不同项目或环境放在不同 namespace，避免名字冲突、权限混在一起。
- **小白记法**：像「文件夹」：`default`、`prod`、`my-app` 各放各的。

---

## 四、本地怎么玩（不买云也能学）

在你自己电脑上跑一个「迷你 K8s」，推荐两种方式二选一。

### 4.1 方式一：Docker Desktop 自带的 Kubernetes

若你已经在用 [Docker Desktop](https://www.docker.com/products/docker-desktop/)：

1. 打开 Docker Desktop → **Settings** → **Kubernetes**。
2. 勾选 **Enable Kubernetes**，等它拉取并启动（几分钟）。
3. 右下角出现 **Kubernetes is running** 即表示本地集群就绪。

之后在终端用 `kubectl`（见下节）即可操作这个本地集群。

### 4.2 方式二：minikube（独立安装）

[minikube](https://minikube.sigs.k8s.io/docs/) 会在你本机起一个小型 K8s 集群：

```bash
# 安装 minikube（以 macOS 为例，其他见官网）
brew install minikube
# 启动集群（需要 Docker 或其它驱动）
minikube start
# 停掉
minikube stop
```

---

## 五、kubectl：和 K8s 对话的命令行工具

**kubectl** = Kubernetes 的「遥控器」。安装好 K8s（Docker Desktop 或 minikube）后，一般会自带或提示你装 `kubectl`。

### 5.1 最常用的几条命令（小白先记这 5 个）

| 你想做的事         | 命令 |
|--------------------|------|
| 看有哪些 Pod       | `kubectl get pods` |
| 看更详细的信息     | `kubectl describe pod <pod 名字>` |
| 看某个 Pod 的日志  | `kubectl logs <pod 名字>` |
| 用 YAML 文件创建/更新资源 | `kubectl apply -f xxx.yaml` |
| 删掉某个资源       | `kubectl delete -f xxx.yaml` 或 `kubectl delete pod <名字>` |

- 加 `-n <namespace>` 可以指定命名空间，例如：`kubectl get pods -n default`。
- 若不知道资源名字，先 `kubectl get pods` 看列表，再对名字做 `describe` / `logs`。

### 5.2 怎么知道「资源名字」？

先查再操作：

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

第一列就是名字，后面几列是状态、副本数等。

---

## 六、最小例子：跑起一个 nginx

下面是一份「最小可用」的 YAML，让 K8s 跑一个 nginx 容器，并给它一个集群内可访问的 Service。

### 6.1 先保存为文件（例如 `nginx-demo.yaml`）

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-demo
  template:
    metadata:
      labels:
        app: nginx-demo
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-demo-svc
spec:
  selector:
    app: nginx-demo
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

- 上面一块是 **Deployment**：跑 1 个 nginx 容器，镜像 `nginx:latest`，容器里开 80 端口。
- 下面一块是 **Service**：给带标签 `app: nginx-demo` 的 Pod 一个入口，集群内访问 `nginx-demo-svc:80` 就能打到 nginx。

### 6.2 在集群里创建

```bash
kubectl apply -f nginx-demo.yaml
```

然后：

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

能看到 `nginx-demo` 的 Pod、Deployment 和 `nginx-demo-svc` 的 Service 就说明成功了。

### 6.3 在集群里访问一下（可选）

若用 **minikube**，想从本机浏览器访问，可以：

```bash
minikube service nginx-demo-svc --url
```

会给你一个本机 URL，用浏览器打开即可。  
若用 **Docker Desktop K8s**，可以用端口转发：

```bash
kubectl port-forward service/nginx-demo-svc 8080:80
```

然后本机打开 `http://localhost:8080`。

---

## 七、和本仓库其它文档的关系

- **[Docker 入门与常用命令手册](/docker/Docker入门与常用命令手册)**：先会「容器和镜像」，再看 K8s 更容易。
- **[etcd](/ai/AI课程-etcd)**、**[MinIO](/ai/AI课程-minio)**：文档里会提到「可部署在 Kubernetes」——指的就是把你建的 etcd/MinIO 用 Pod + Service 等形式跑在 K8s 里；你先把本文的「Pod / Deployment / Service」搞懂，再按它们文档的示例 YAML 或 Helm 一步步做即可。

---

## 八、小结（小白自检）

- 能用自己的话说完：**K8s 是干什么的**、**和 Docker 的区别**。
- 知道 **Pod / Deployment / Service / Namespace** 各是啥意思（不要求背定义）。
- 能在本地用 **Docker Desktop 或 minikube** 起一个集群，会用 **kubectl get/apply/describe/logs** 做最基本操作。
- 能按「六、最小例子」跑起一个 nginx，并知道怎么用 `port-forward` 或 `minikube service` 在浏览器里打开。

做到这些，你就已经**入门**了。后面再学 Ingress、ConfigMap、Volume、Helm 等，可以按实际需求一点点加。

---

## 延伸阅读

| 资源 | 说明 |
|------|------|
| [Kubernetes 官方文档（英文）](https://kubernetes.io/docs/home/) | 概念和参考最全 |
| [minikube 文档](https://minikube.sigs.k8s.io/docs/) | 本地实验用 |
| [Docker 入门与常用命令手册](/docker/Docker入门与常用命令手册) | 本仓库容器基础 |

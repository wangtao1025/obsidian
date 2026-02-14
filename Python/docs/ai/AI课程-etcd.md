# AI 课程：etcd

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **etcd** 文档。etcd 是基于 Raft 共识的分布式键值存储，常用作服务发现、配置中心与分布式锁，也是 Kubernetes 的默认存储；在 RAG/向量库等分布式部署中常作为协调与配置基础设施。

---

## 1. etcd 是什么？

**etcd** 通过 **Raft 共识协议**保证集群中所有副本的数据一致，提供 REST/gRPC 接口，常被当作「分布式字典」或「配置中心」，也是 **Kubernetes 的默认存储**。

- 官网：[etcd](https://etcd.io/)

---

## 2. 学前准备

了解 TCP、HTTP 和基础 Python 即可。若对「共识算法」或「租约」不熟悉，可先看本节简要说明。

### 2.1 运行一个测试环境

从 [etcd 官网](https://etcd.io/) 下载并解压 release 后，在本地启动单节点（以下假设 etcd 可执行文件在当前目录）：

```bash
# Windows PowerShell
cd C:\etcd
.\etcd.exe --data-dir=data --listen-client-urls=http://127.0.0.1:2379 --advertise-client-urls=http://127.0.0.1:2379

# macOS
cd /usr/local/Cellar/etcd/*/bin
./etcd --data-dir=data --listen-client-urls=http://127.0.0.1:2379 --advertise-client-urls=http://127.0.0.1:2379
```

### 2.2 Raft 共识速览

- Raft 集群中只有**一个 Leader** 接受写请求。
- Leader 将日志复制到**半数以上**节点后才确认写入。
- 少数节点宕机不会破坏数据一致性。

### 2.3 租约（Lease）与 TTL

- **租约**类似带倒计时的句柄，可绑定多个键。
- 租约到期且不续租时，**所有关联键会自动删除**。
- 适用于：服务注册、心跳检测、分布式锁。

### 2.4 Watch 机制

- 客户端可 **watch** 任意键或前缀。
- 键的值一旦变化，即可**立刻收到通知**。
- 是配置热更新、服务发现的基础能力。

---

## 3. 核心特性

### 3.1 层级键值模型

- 键采用层级结构，如：`/services/api/instance-1`。
- 值可为字符串、JSON 或二进制。
- 便于按业务或环境划分命名空间。

### 3.2 Raft 带来的强一致

- 写请求经 Leader 排队并复制到多数节点，**多数派认可**后才算成功。
- 不会出现读到旧数据，etcd 属于 **CAP 中的 CP** 系统。

### 3.3 租约与 KeepAlive

- 为键绑定租约后，客户端需**定期 KeepAlive**，否则租约到期会删除键。
- 可用于：临时节点、服务心跳、**自动释放的锁**。

### 3.4 Watch 即时通知

- 客户端可**订阅键前缀**，键的创建、修改、删除会按顺序推送事件。
- 便于在配置变更或服务上下线时第一时间响应。

---

## 4. 典型应用场景

### 4.1 服务发现

- 服务实例在 `/services/<name>/<instance-id>` 写入自己的地址并绑定租约。
- 消费者 **watch** 同一前缀即可实时维护实例列表。

### 4.2 分布式配置中心

- 配置集中存储在 `/config/...`。
- 业务进程启动时读取并 **watch** 对应前缀，收到事件后刷新内存配置，实现**热更新**。

### 4.3 分布式锁

- 在 `/locks/<resource>` 创建**带租约的键**实现互斥。
- 先写入成功者持有锁；租约过期或删除键即释放锁。

---

## 5. Python 实战示例

以下假设 etcd 在 `127.0.0.1:2379` 运行，并已安装 `etcd3`。

### 5.1 读写键值

```bash
# 安装依赖
# Windows
python -m pip install etcd3
# macOS / Linux
python3 -m pip install etcd3
```

```python
import etcd3

client = etcd3.client(host="127.0.0.1", port=2379)

def write_message(key: str, value: str) -> None:
    client.put(key, value)

def read_message(key: str) -> str:
    value, meta = client.get(key)
    if value is None:
        return "key not found"
    return value.decode()

if __name__ == "__main__":
    write_message("/demo/msg", "Hello etcd")
    print(read_message("/demo/msg"))
```

若遇 **Protocol Buffers** 版本兼容问题，可设置：

```bash
# Windows PowerShell
$env:PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION="python"
# Windows CMD
set PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
# Linux / macOS
export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
```

### 5.2 Watch 与租约示例

监听配置键变化，并用租约实现自动过期：

```python
import threading
import time
import etcd3

client = etcd3.client(host="127.0.0.1", port=2379)

def watch_config() -> None:
    events, cancel = client.watch("/config/db-url")
    for event in events:
        print(f"Watch Event: {event.value.decode()}")

def main() -> None:
    watcher = threading.Thread(target=watch_config, daemon=True)
    watcher.start()

    lease = client.lease(20)
    client.put("/config/db-url", "mysql://localhost", lease=lease)

    time.sleep(5)
    client.put("/config/db-url", "mysql://prod-host", lease=lease)
    lease.refresh()

    time.sleep(25)  # 租约过期后键被自动删除

if __name__ == "__main__":
    main()
```

---

## 6. etcdctl 常用命令

`etcdctl` 为官方 CLI，需设置 `ETCDCTL_API=3`：

```bash
# Windows PowerShell
set ETCDCTL_API=3
.\etcdctl.exe put /demo/key "value-from-windows"
.\etcdctl.exe get /demo/key
.\etcdctl.exe watch /demo/key

# macOS / Linux
export ETCDCTL_API=3
./etcdctl put /demo/key "value-from-macos"
./etcdctl get /demo/key
./etcdctl watch /demo/key
```

在一个终端执行 `watch`，在另一终端执行 `put`，即可看到实时事件。

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [Milvus 向量数据库与 PyMilvus](/ai/AI课程-Milvus向量数据库与PyMilvus) · [Kubernetes 入门](/docker/Kubernetes入门)（etcd 常部署于 K8s） · [知识体系与学习路径](/ai/知识体系与学习路径) · [etcd（课程原文）](https://rag.docs-hub.com/html/etcd.html)

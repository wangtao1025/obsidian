# AI 课程：MinIO

本文对应课程 [rag.docs-hub.com](https://rag.docs-hub.com/) 中的 **minio** 文档。MinIO 是单二进制即可运行的开源**对象存储**，与 Amazon S3 API 兼容，适合在本地或私有云中存图片、音视频、备份、日志等非结构化数据；在 RAG/向量库等场景中常作为文件与模型存储基础设施。

---

## 1. MinIO 是什么？

**MinIO** 是轻量、高性能、部署简单的对象存储，提供与 **Amazon S3 相同的 API**，适合在本地或私有云中替代 S3，存储非结构化数据（图片、音视频、备份、日志等）。

---

## 2. 前置知识：对象存储速览

| 特性       | 文件存储     | 块存储       | 对象存储（MinIO）   |
|------------|--------------|--------------|----------------------|
| 数据结构   | 目录 + 文件  | 固定大小块   | 桶 Bucket + 对象 Object |
| 访问方式   | 路径 (/docs/a.txt) | 直接读写块 | 通过 Key（如 my-bucket/pic.jpg） |
| 协议       | NFS、SMB     | SCSI、iSCSI  | S3 API、HTTP/HTTPS  |
| 适用场景   | 文档、源码   | 数据库、虚拟机 | 大数据、备份、静态资源 |

可理解为：给每个「包裹」一个唯一条形码（Key），放进同一仓库（Bucket），需要时凭 Key 取出，适合海量文件。

---

## 3. 环境准备与安装

默认账号为 `minioadmin` / `minioadmin`，生产环境请自行修改。

### 3.1 下载与启动单节点

```bash
# Windows PowerShell
Invoke-WebRequest -Uri https://dl.min.io/server/minio/release/windows-amd64/minio.exe -OutFile minio.exe
.\minio.exe server D:\minio-data --console-address ":9001"

# macOS
curl -O https://dl.min.io/server/minio/release/darwin-amd64/minio
chmod +x minio
./minio server ~/minio-data --console-address ":9001"
```

- **API** 默认：`http://127.0.0.1:9000`  
- **Web 控制台**：`http://127.0.0.1:9001`  
在控制台可创建 Access Key、Secret Key，供程序访问。

### 3.2 安装 Python SDK

```bash
# Windows
python -m pip install minio
# macOS / Linux
python3 -m pip install minio
```

---

## 4. MinIO 核心概念

### 4.1 对象（Object）

- 最小存储单元，包含文件内容、自定义元数据及**唯一 Key**。
- 上传时可附带标签、Content-Type 等。

### 4.2 桶（Bucket）

- 存放对象的容器，类似「文件夹」。
- 桶名在同一 MinIO 实例中**必须唯一**，可为每个桶配置访问策略、生命周期等。

### 4.3 S3 兼容 API

- MinIO 完整实现 S3 API，AWS CLI、boto3、Terraform 等可直接对接。
- 已有 S3 代码通常只需改 **endpoint** 即可。

### 4.4 纠删码与分布式部署（可选）

- 生产可配置多节点，数据与校验块分布到不同硬盘，部分节点宕机仍可读写。
- 入门可先用单机模式练习。

---

## 5. Python 实战示例

以下假设 MinIO 在 `http://127.0.0.1:9000`，Access Key / Secret Key 均为 `minioadmin`。

### 5.1 创建桶并上传文件

```python
from pathlib import Path
from minio import Minio
from minio.error import S3Error

client = Minio(
    endpoint="127.0.0.1:9000",
    access_key="minioadmin",
    secret_key="minioadmin",
    secure=False  # 本地 HTTP
)

def ensure_bucket(bucket_name: str) -> None:
    if not client.bucket_exists(bucket_name):
        client.make_bucket(bucket_name)

def upload_sample(bucket_name: str, object_name: str, file_path: Path) -> None:
    client.fput_object(bucket_name, object_name, file_path.as_posix())

def list_objects(bucket_name: str) -> None:
    for obj in client.list_objects(bucket_name, recursive=True):
        print(f"{obj.object_name}\t{obj.size} bytes")

if __name__ == "__main__":
    try:
        bucket = "demo-bucket"
        sample_file = Path("hello.txt")
        sample_file.write_text("Hello MinIO!", encoding="utf-8")
        ensure_bucket(bucket)
        upload_sample(bucket, "docs/hello.txt", sample_file)
        list_objects(bucket)
    except S3Error as exc:
        print(f"MinIO error: {exc}")
```

### 5.2 生成一次性下载链接

使用**预签名 URL** 临时共享对象（带有效期）：

```python
from datetime import timedelta
from minio import Minio

client = Minio(
    endpoint="127.0.0.1:9000",
    access_key="minioadmin",
    secret_key="minioadmin",
    secure=False
)

def create_presigned_url(bucket_name: str, object_name: str) -> str:
    return client.presigned_get_object(
        bucket_name=bucket_name,
        object_name=object_name,
        expires=timedelta(hours=1)
    )

if __name__ == "__main__":
    url = create_presigned_url("demo-bucket", "docs/hello.txt")
    print(f"Download link: {url}")
```

---

## 6. 常见使用场景

- **云原生持久化**：在 Kubernetes 中部署 MinIO，为微服务或任务提供对象存储。  
- **备份与容灾**：用生命周期策略把旧数据复制到另一套 MinIO 或公有云。  
- **静态资源托管**：前端静态文件、图片、视频放 MinIO，配合 CDN/反向代理对外提供。  
- **AI/ML 数据集**：训练样本集中到 MinIO，配合 Spark、PyTorch 等通过 S3 接口读取。  
- **日志归档**：应用或数据库的归档文件定期上传至 MinIO，统一管理。  

---

**相关文档**：[RAG 与向量基础](/ai/AI课程-RAG与向量基础) · [etcd](/ai/AI课程-etcd) · [Kubernetes 入门](/docker/Kubernetes入门)（MinIO 常部署于 K8s） · [知识体系与学习路径](/ai/知识体系与学习路径) · [minio（课程原文）](https://rag.docs-hub.com/html/minio.html)

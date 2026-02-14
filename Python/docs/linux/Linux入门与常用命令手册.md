# 🐧 Linux 入门与常用命令手册

面向零基础、事无巨细的 Linux 与终端操作查漏补缺手册。

## 文档链接

| **需求场景** | **对应网站 / 工具** |
| ----------- | ------------------- |
| **查命令用法 (man)** | 终端内 `man 命令名` |
| **命令速查 (tldr)** | [tldr.ostera.io](https://tldr.ostera.io/) 或安装 `tldr` |
| **各发行版官方文档** | [Ubuntu](https://help.ubuntu.com/) / [Fedora](https://docs.fedoraproject.org/) / [Arch Wiki](https://wiki.archlinux.org/) |
| **Shell 脚本进阶** | [Bash 参考手册](https://www.gnu.org/software/bash/manual/) |

---

## 一、Linux 与终端入门

### 1.1 Linux 是什么

- **核心直觉**：Linux 通常指「内核 (kernel)」+ 外围软件组成的**操作系统**。我们日常说的「装 Linux」多半是装某个**发行版 (Distribution)**。
- **发行版**：基于 Linux 内核，打包了软件源、包管理器、桌面/服务器环境。常见有：
  - **Ubuntu / Debian**：`apt` 包管理，入门友好。
  - **CentOS / RHEL / Fedora**：`yum` / `dnf`，企业常见。
  - **Arch**：滚动更新，文档全但需一定动手能力。

### 1.2 终端与 Shell

- **终端 (Terminal)**：一个「窗口」，用来输入文字命令并显示输出。
- **Shell**：在终端里「解释你输入的命令」的程序。常见为 **Bash**（`/bin/bash`）。
- **提示符**：如 `user@host:~$`，`~` 表示当前用户的家目录，`$` 表示普通用户（`#` 表示 root）。

### 1.3 命令的通用形式

```bash
命令名 [选项] [参数]
```

- **选项**：多为 `-单字母` 或 `--完整单词`，用来改变命令行为。
- **参数**：命令作用的对象（文件、目录等）。
- **工业习惯**：选项常在参数前；多个单字母选项可合并，如 `ls -l -a` 常写成 `ls -la`。

---

## 二、文件与目录

### 2.1 路径

- **绝对路径**：从根目录 `/` 写起，如 `/home/user/docs/file.txt`。
- **相对路径**：相对于当前目录。
  - `.` 当前目录，`..` 上一级。
  - `~` 当前用户家目录（如 `/home/user`）。
- **注意**：路径中**空格**要用引号或转义，如 `cd "My Documents"` 或 `cd My\ Documents`。

### 2.2 基础命令：`pwd`、`cd`、`ls`

| 命令 | 作用 | 常用示例 |
|------|------|----------|
| `pwd` | 打印当前工作目录 | `pwd` |
| `cd` | 切换目录 | `cd /tmp`、`cd ..`、`cd ~` |
| `ls` | 列出目录内容 | `ls`、`ls -la`、`ls /etc` |

#### 2.2.1 `ls` 常用选项

- **`-l`**：长格式（权限、所有者、大小、时间等）。
- **`-a`**：显示隐藏文件（以 `.` 开头的文件）。
- **`-h`**：人类可读的大小（K、M、G）。
- **`-t`**：按修改时间排序。
- **组合**：`ls -lah`、`ls -lht`。

```bash
ls -la /etc
# 列出 /etc 下所有文件（含隐藏），长格式
```

### 2.3 创建与删除：`mkdir`、`rm`、`rmdir`

| 命令 | 作用 | 注意 |
|------|------|------|
| `mkdir dirname` | 创建目录 | `mkdir -p a/b/c` 可递归创建多级 |
| `rmdir dirname` | 删除**空**目录 | 目录非空会报错 |
| `rm path` | 删除文件或目录 | **不可恢复**，慎用 |

#### 2.3.1 `rm` 的坑与安全用法

- **`rm -r dir`**：递归删除目录及其内容。
- **`rm -f file`**：强制删除，不提示。
- **⚠️ 禁止**：`rm -rf /` 或 `rm -rf /*` 会毁掉系统。永远先 `pwd` 确认当前目录，再对路径做 `rm`。
- **建议**：删除前用 `ls` 看一眼，或先 `mv` 到回收目录再定期清空。

### 2.4 复制与移动：`cp`、`mv`

| 命令 | 作用 | 常用形式 |
|------|------|----------|
| `cp src dst` | 复制 | `cp file.txt backup/`、`cp -r dir1 dir2` |
| `mv src dst` | 移动（或重命名） | `mv old.txt new.txt`、`mv file.txt ~/docs/` |

- **复制目录**：必须加 `-r`（递归），如 `cp -r mydir backup/`。
- **覆盖**：默认会覆盖同名文件；`cp -i`、`mv -i` 覆盖前询问。

### 2.5 通配符（Glob）

在 Shell 中，以下字符有特殊含义（由 Shell 展开后再传给命令）：

| 通配符 | 含义 | 示例 |
|--------|------|------|
| `*` | 任意长度任意字符 | `ls *.txt` 列出当前目录所有 .txt |
| `?` | 任意单个字符 | `ls file?.txt` 匹配 file1.txt、fileA.txt |
| `[abc]` | 括号内任选一字符 | `ls file[123].txt` |
| `[0-9]` | 数字范围 | `ls log[0-9].txt` |
| `[!x]` 或 `[^x]` | 除 x 外的单字符 | `ls file[!0].txt` |

- **注意**：通配符是 **Shell** 展开的，命令收到的是已展开的文件名列表；若没有匹配，部分 Shell 会原样把 `*` 传给命令，可能报错。

---

## 三、文本查看与搜索

### 3.1 查看文件内容

| 命令 | 适用场景 | 常用选项 |
|------|----------|----------|
| `cat file` | 小文件整篇输出 | `cat -n file` 显示行号 |
| `less file` | 大文件分页浏览 | 空格翻页，`/关键词` 搜索，`q` 退出 |
| `head -n 20 file` | 看前 n 行 | 默认 10 行 |
| `tail -n 20 file` | 看后 n 行 | `tail -f file` 持续跟踪追加（看日志常用） |

- **核心直觉**：大文件用 `less`，别用 `cat` 刷屏；看日志末尾与实时追加用 `tail -f`。

### 3.2 搜索文本：`grep`

- **语法**：`grep [选项] 模式 [文件...]`
- **作用**：在行中匹配「模式」（默认基础正则），输出匹配到的**整行**。

| 常用选项 | 含义 |
|----------|------|
| `-i` | 忽略大小写 |
| `-n` | 显示行号 |
| `-v` | 反向：输出**不**匹配的行 |
| `-r` | 递归目录（对目录下所有文件搜） |
| `-E` | 使用扩展正则（或直接用 `egrep`） |
| `-l` | 只输出**文件名**（不输出行内容） |

```bash
grep -n "error" /var/log/syslog
grep -r "TODO" --include="*.py" .
grep -E "192\.168\.(1|2)\.[0-9]+" access.log
```

- **注意**：模式中 `.`、`*` 等是正则符号；要当普通字符用时加反斜杠或放在 `grep -F` 里（按字面匹配）。

### 3.3 查找文件：`find`

- **语法**：`find 目录 [条件] [动作]`
- **作用**：在目录树下按名称、类型、时间等条件找文件。

| 常用条件 | 示例 |
|----------|------|
| `-name "*.txt"` | 按名称（支持通配符） |
| `-type f` | 普通文件；`-type d` 目录 |
| `-mtime -7` | 7 天内修改过 |
| `-size +100M` | 大于 100MB |
| `-empty` | 空文件或空目录 |

```bash
find /tmp -name "*.log" -mtime -1
find ~ -type f -size +50M
find . -empty -type d
```

- **执行命令**：`-exec cmd {} \;`（`{}` 会被替换成当前文件名），注意 `\;` 结束。

```bash
find . -name "*.bak" -exec rm {} \;
```

---

## 四、重定向与管道

### 4.1 标准流

- **stdin (0)**：标准输入，命令默认从键盘读。
- **stdout (1)**：标准输出，命令默认输出到终端。
- **stderr (2)**：标准错误，错误信息默认也到终端。

### 4.2 重定向

| 写法 | 含义 |
|------|------|
| `cmd > file` | 标准输出**覆盖**写入 file |
| `cmd >> file` | 标准输出**追加**到 file |
| `cmd 2> file` | 标准错误写入 file |
| `cmd &> file` 或 `cmd > file 2>&1` | 标准输出和错误都写入 file |
| `cmd < file` | 从 file 读入标准输入 |

- **注意**：`>` 会先清空文件再写；不想清空用 `>>` 追加。

### 4.3 管道（Pipe）

- **语法**：`cmd1 | cmd2`
- **含义**：cmd1 的**标准输出**作为 cmd2 的**标准输入**。

```bash
cat access.log | grep "404"
ls -l | less
ps aux | grep nginx
```

- **核心直觉**：管道只传递 stdout，不传递 stderr；若要让 stderr 也进管道，需先重定向，如 `cmd 2>&1 | grep ...`。

---

## 五、用户、组与权限

### 5.1 用户与组

- **root**：超级用户，UID 0，权限最大。
- **普通用户**：一般有家目录 `/home/用户名`，不能直接改系统关键文件。
- **组**：用户可属于多个组，用于共享权限。

| 命令 | 作用 |
|------|------|
| `whoami` | 当前用户名 |
| `id` | 当前用户 UID、GID、所属组 |
| `groups` | 当前用户所属组列表 |

### 5.2 文件权限含义

- **长格式示例**：`-rwxr-xr-x` 或 `drwxr-xr-x`
  - 第 1 位：`-` 文件，`d` 目录，`l` 符号链接。
  - 第 2–4 位：**所有者 (user)** 的 r/w/x。
  - 第 5–7 位：**所属组 (group)** 的 r/w/x。
  - 第 8–10 位：**其他人 (others)** 的 r/w/x。

| 权限 | 对文件 | 对目录 |
|------|--------|--------|
| r (4) | 可读内容 | 可列目录内容（ls） |
| w (2) | 可写内容 | 可在此目录增删改文件 |
| x (1) | 可执行 | 可进入该目录（cd） |

- **目录的 x**：没有 x 则无法 `cd` 进去，也无法访问其下文件路径。

### 5.3 修改权限：`chmod`

- **数字形式**：`chmod 755 file`（7=rwx, 5=r-x, 5=r-x）。
- **符号形式**：`u` 所有者，`g` 组，`o` 其他人，`a` 全部；`+` 增加，`-` 去掉，`=` 设为某权限。

```bash
chmod 644 file.txt
chmod u+x script.sh
chmod -R 755 mydir/
```

- **`-R`**：递归改目录下所有文件，慎用。

### 5.4 修改所有者与组：`chown`、`chgrp`

- **`chown user:group file`**：改所有者和组（仅 root 或文件所有者可改所有者）。
- **`chgrp group file`**：只改组。
- **递归**：`chown -R user:group dir/`。

### 5.5 以 root 执行：`sudo`

- **`sudo cmd`**：以 root 身份执行一条命令（若当前用户在 sudoers 里）。
- **`sudo -i`** 或 **`sudo su -`**：切换到 root 登录环境（慎用，用完建议 `exit`）。
- **注意**：不要随意把普通用户加入 sudoers 无密码，有安全风险。

---

## 六、进程与系统管理

### 6.1 查看进程：`ps`、`top`

| 命令 | 特点 |
|------|------|
| `ps aux` | 快照：当前所有进程（BSD 风格选项） |
| `ps -ef` | 快照：同上，另一种风格 |
| `top` | 实时刷新，按 CPU/内存排序，`q` 退出 |
| `htop` | 更友好的交互（若已安装） |

- **常见列**：PID（进程号）、USER、%CPU、%MEM、VSZ/RSS、STAT、COMMAND。

### 6.2 结束进程：`kill`、`killall`

- **`kill PID`**：默认发 SIGTERM（15），请求进程正常退出。
- **`kill -9 PID`**：发 SIGKILL（9），强制杀死（无法被进程捕获，慎用）。
- **`killall 进程名`**：按名称结束（会结束所有同名进程）。

```bash
kill 12345
kill -9 12345
killall nginx
```

### 6.3 后台与前后台

- **`cmd &`**：后台运行，终端可继续输入。
- **`Ctrl+Z`**：挂起当前前台进程。
- **`jobs`**：列出当前会话的后台/挂起任务。
- **`fg %n`**：把第 n 个任务拉到前台；**`bg %n`**：在后台继续运行。
- **`nohup cmd &`**：脱离终端后仍运行（输出默认到 `nohup.out`）。

### 6.4 系统信息常用命令

| 命令 | 作用 |
|------|------|
| `uname -a` | 内核与主机信息 |
| `hostname` | 主机名 |
| `free -h` | 内存使用（人类可读） |
| `df -h` | 磁盘空间 |
| `du -sh dir` | 目录占用空间 |
| `uptime` | 运行时间与负载 |

---

## 七、包管理与软件安装

### 7.1 Debian/Ubuntu：`apt`

| 命令 | 作用 |
|------|------|
| `sudo apt update` | 更新软件源索引（建议安装前先执行） |
| `sudo apt install 包名` | 安装包 |
| `sudo apt remove 包名` | 卸载包（保留配置） |
| `sudo apt purge 包名` | 卸载并删除配置 |
| `apt search 关键词` | 搜索包 |
| `apt show 包名` | 显示包信息 |
| `sudo apt upgrade` | 升级已安装的包 |

- **注意**：修改源列表在 `/etc/apt/sources.list` 或 `/etc/apt/sources.list.d/`，改完要 `apt update`。

### 7.2 RHEL/CentOS/Fedora：`yum` / `dnf`

| 命令 (yum/dnf 类似) | 作用 |
|---------------------|------|
| `sudo dnf install 包名` | 安装 |
| `sudo dnf remove 包名` | 卸载 |
| `dnf search 关键词` | 搜索 |
| `dnf info 包名` | 包信息 |
| `sudo dnf update` | 更新系统 |

### 7.3 从源码安装（入门了解）

- 常见流程：解压 → `./configure`（若存在）→ `make` → `sudo make install`。
- 依赖需自行用包管理器先装（如 `build-essential`、`libxxx-dev`）。
- 生产环境更推荐用包管理器或官方二进制包，便于升级与卸载。

---

## 八、网络与远程

### 8.1 本机网络信息

| 命令 | 作用 |
|------|------|
| `ip addr` 或 `ip a` | 查看 IP、网卡 |
| `ip route` | 路由表 |
| `ss -tuln` | 监听端口（替代 netstat） |
| `ping 主机` | 测连通性（部分环境需 `-c 3` 限制次数） |

### 8.2 下载与请求

| 命令 | 作用 |
|------|------|
| `wget -O file URL` | 下载到指定文件名 |
| `curl -O URL` | 下载（-O 用 URL 末尾作文件名） |
| `curl -I URL` | 只取响应头 |

### 8.3 SSH 远程登录与 SCP 传文件

- **登录**：`ssh user@host`（默认 22 端口）；`ssh -p 2222 user@host` 指定端口。
- **密钥登录**：`ssh-copy-id user@host` 把本机公钥拷到服务器，之后可无密码登录。
- **传文件**：
  - **`scp file user@host:path`**：本机 → 远程。
  - **`scp user@host:path file`**：远程 → 本机。
  - **`scp -r dir user@host:path`**：递归传目录。

---

## 九、Shell 基础（变量与简单脚本）

### 9.1 变量

- **赋值**：`name=value`（等号两边**不能**有空格）。
- **使用**：`$name` 或 `${name}`；后者便于拼接，如 `${name}_suffix`。
- **环境变量**：`export VAR=value` 可被子进程继承；查看用 `env` 或 `printenv`。

```bash
MY_DIR=/home/user/docs
cd $MY_DIR
echo ${MY_DIR}/backup
```

### 9.2 引号

| 引号 | 行为 |
|------|------|
| 双引号 `"..."` | 变量会展开，`$var` 会替换；部分符号需转义 |
| 单引号 `'...'` | 完全不展开，所见即所得 |
| 反引号 `` `cmd` `` 或 `$(cmd)` | 命令替换，用命令输出作为字符串 |

- **推荐**：命令替换用 `$(cmd)`，可嵌套且更清晰。

### 9.3 简单脚本

- **第一行**：`#!/bin/bash`（Shebang），指定用 bash 执行。
- **执行**：`chmod +x script.sh` 后 `./script.sh`，或直接 `bash script.sh`。
- **参数**：脚本内 `$1`、`$2` 为第 1、2 个参数；`$0` 为脚本名；`$#` 为参数个数。

```bash
#!/bin/bash
echo "第一个参数: $1"
echo "参数个数: $#"
```

---

## 十、常用场景速查

### 10.1 看日志

```bash
tail -f /var/log/syslog
tail -n 500 /var/log/nginx/access.log | less
grep "error" /var/log/app.log
```

### 10.2 磁盘与空间

```bash
df -h
du -sh *
du -h --max-depth=1
```

### 10.3 定时任务：crontab

- **编辑**：`crontab -e`
- **格式**：分 时 日 月 周 命令（每项空格分隔）。

```bash
# 每天 2 点执行备份脚本
0 2 * * * /home/user/backup.sh
# 每 5 分钟执行一次
*/5 * * * * /usr/bin/check.sh
```

### 10.4 压缩与解压

| 格式 | 解压 | 压缩 |
|------|------|------|
| .tar | `tar -xf file.tar` | `tar -cf file.tar dir/` |
| .tar.gz | `tar -xzf file.tar.gz` | `tar -czf file.tar.gz dir/` |
| .zip | `unzip file.zip` | `zip -r file.zip dir/` |

- **记忆**：`x` 解压，`c` 打包；`z` 表示 gzip，`j` 表示 bzip2；`f` 后面跟文件名。

---

## 十一、安全与习惯建议

- **慎用 root**：日常用普通用户，需要时再用 `sudo`。
- **慎用 `rm -rf`**：先确认路径，可先 `mv` 到临时目录。
- **备份与脚本**：重要操作前备份；复杂流程写成脚本并加注释。
- **权限最小化**：文件、目录不要随意 777；服务尽量用专用用户跑。
- **更新系统**：定期 `apt update && apt upgrade`（或对应发行版命令），并关注安全公告。

本手册覆盖从零到日常运维所需的大部分命令与概念，可按章节查阅；遇到具体命令细节，请结合 `man 命令名` 与官方文档使用。

# Nginx 配置文件详解

**Nginx配置文件构成**

一个 Nginx 配置文件通常包含3个模块：

- 全局块：比如工作进程数，定义日志路径；
- Events块：设置处理轮询事件模型，每个工作进程最大连接数及 `http` 层的 `keep-alive` 超时时间；
- http块 `{ serve、upstream... }` ： 路由匹配、静态文件服务器、反向代理、负载均衡等。

**配置文件示例** : 

```bash
 # 全局块
 user www-data;
 worker_processes  2;  ## 默认1，一般建议设成CPU核数1-2倍
 error_log  logs/error.log; ## 错误日志路径
 pid  logs/nginx.pid; ## 进程id
 
 # Events块
 events {
   # 使用epoll的I/O 模型处理轮询事件。
   # 可以不设置，nginx会根据操作系统选择合适的模型
   use epoll;
   
   # 工作进程的最大连接数量, 默认1024个
   worker_connections  2048;
   
   # http层面的keep-alive超时时间
   keepalive_timeout 60;
   
   # 客户端请求头部的缓冲区大小
   client_header_buffer_size 2k;
 }
 
 # http块
 http { 
   include mime.types;  # 导入文件扩展名与文件类型映射表
   default_type application/octet-stream;  # 默认文件类型
   
   # 日志格式及access日志路径
   log_format   main '$remote_addr - $remote_user [$time_local]  $status '
     '"$request" $body_bytes_sent "$http_referer" '
     '"$http_user_agent" "$http_x_forwarded_for"';
   access_log   logs/access.log  main;
   
   # 允许sendfile方式传输文件，默认为off。
   sendfile     on;
   tcp_nopush   on; # sendfile开启时才开启。
 
   # http server块
   # 简单反向代理
   server {
     listen       80;
     server_name  domain2.com www.domain2.com;
     access_log   logs/domain2.access.log  main;
    
     # 转发动态请求到 web 应用服务器
     location / {
       proxy_pass      http://127.0.0.1:8000;
       deny 192.24.40.8;   # 拒绝的ip
       allow 192.24.40.6;  # 允许的ip   
     }
     
     # 错误页面
     error_page   500 502 503 504  /50x.html;
         location = /50x.html {
             root   html;
         }
   }
 
   # 负载均衡
   upstream backend_server {
     server 192.168.0.1:8000 weight=5; # weight越高，权重越大
     server 192.168.0.2:8000 weight=1;
     server 192.168.0.3:8000;
     server 192.168.0.4:8001 backup; # 热备
   }
 
   server {
     listen          80;
     server_name     big.server.com;
     access_log      logs/big.server.access.log main;
     
     charset utf-8;
     client_max_body_size 10M; # 限制用户上传文件大小，默认1M
 
     location / {
       # 使用 proxy_pass 转发请求到通过 upstream 定义的一组应用服务器
       proxy_pass      http://backend_server;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header Host $http_host;
       proxy_redirect off;
       proxy_set_header X-Real-IP  $remote_addr;
     }
   }
 }
```

注意： `http` 块也可以进一步分成3块，

- `http` 全局块里的配置对所有站点生效，
- `server`  块配置选项仅对单个站点生效，
- `location`  块的配置仅对单个页面或url生效。



```bash
    server {
        listen 80;
        server_name baidu.com;

        location / {
            root /opt/insight/insight-front-end/build/;
            index index.html;
            try_files $uri /index.html;
        }

        location ~/api/ {
            proxy_pass http://127.0.0.1:7001;
            proxy_buffer_size 1024k;
            proxy_buffers 16 1024k;
            proxy_busy_buffers_size 2048k;
            proxy_temp_file_write_size 2048k;
        }
    }
```







## Nginx 配置状态码，错误文件

```nginx
server {
    root   /usr/share/nginx/html;
    # http status 为 404时, 返回 404.html
    error_page 404 /404.html;

    # http status 为 500或者502, 返回 50x.html
    error_page   500 502  /50x.html;

    # http status 为 503, 返回 50x.html， 且返回错误码改为 200
    error_page   503 = 200  /50x.html;

    # http status 为 504, 重定向到 https://cjw.design，http code 码改为 301
    error_page   504 = 301  https://cjw.design;
}
```



## Nginx限制IP访问频率以及白名单配置

限制每一个IP对同一个接口的疯狂调用，这次我们来用 nginx 处理这个问题。 主要用到了 nginx 的ngx_http_limit_conn_module和ngx_http_limit_req_module两个配置： ngx_http_limit_conn_module：限制并发连接数； ngx_http_limit_req_module：限制一段时间内同一IP的访问频率； 首先，我们为了防止别人来攻击，或者访问量异常过高导致服务器崩掉，就需限制访问量， 如果是一瞬间的并发访问，那么我们就需要限制一秒之内的并发连接数，此时就需要用到第一个配置 本文来自：问轩博客，原地址：https://www.shnne.com/post/308.html

https://www.shnne.com/post/308.html



limit not more than 2 requests per minute from one IP address :

```bash
http {
limit_req_zone $binary_remote_addr zone=one:10m rate=2r/m;

...

server {

    ...

    location /search/ {
        limit_req zone=one burst=3 nodelay;
    }
```







## **阿里云 ECS**

### 备案

域名实名后，首先要管局审核，然后才能启动备案流程。

最好是 A 持有域名，然后在 A 的服务器备案。

如果是 B 持有域名，进行其公司备案，那么需要得到 A 的**备案服务码**

> 注意：每个 ECS 实例只能申请 5个 备案服务码，无法申请新的备案服务码。
>
> 如果服务器对应的备案服务码如果已使用完，您需要购买新的服务器，在新的服务器上申请备案服务码。



个人备案：不能出现行业信息

企业备案：信息要一致 —— 域名需要持有在企业法人手里。

### 1. 域名购买

域名是分 国际域名与国内域名的，国际域名是不用备案的，但是国内的域名是必须 ICP备案的 [阿里云ICP代备案管理系统](https://link.juejin.cn/?target=https%3A%2F%2Fbeian.aliyun.com%2Forder%2Findex.htm%3Fspm%3Da3c00.7621333.a3c1z.1.2439nxagnxagjz)，不然不能用，

如果是国内域名，如何备案域名，请自己上网查找教程。

如果购买了域名了，还要设置域名映射到相应的公网 ip ，不然也不能用。

```bash
        location / {
            root /home/zhifeng/client/build/;
            index index.html;
            try_files $uri /index.html;
        }
```



https://dev.to/abdulwaqar844/how-to-build-and-deploy-a-mernreactexpressmongodbnodejs-stack-application-on-aws-ec2-3e93

https://juejin.cn/post/7069426618724253704

SSL : https://juejin.cn/post/6844903709386752007





### 2. HTTPS

这里以阿里云为例，其免费申请流程为：

（1）注册阿里云账号

（2）打开“管理控制台” -- “安全（云盾）” -- “CA证书服务”

（3）打开右上角“购买证书”：

（4）选择“免费型DV SSL”，并点击立即购买。购买成功后跳转到“我的证书”页面：

（5）此时的状态处于“待完成”，点击右侧“补全”按钮，补全域名信息：

（6）按照流程单击“下一步”，填写个人信息，上传相关信息等。最后跳回“我的证书”页面：

（7）此时的状态变成了“待审核”。点击右侧“进度”按钮，进入详情页：

（8）这里需要配置域名授权验证。具体步骤可参考：[如何配置域名授权验证?](https://link.zhihu.com/?target=https%3A//help.aliyun.com/knowledge_detail/48016.html) 配置完成后点击“配置检查”，如果配置成功，则：

![img](https://pic2.zhimg.com/80/v2-051f9f4e8325603629ea82c4768e3a31_1440w.jpg)

此时耐心等待审核结果即可。一般需要3到5个工作日。



## 安装 Node、npm、yarn、git

yum install curl gnupg2 -y



```bash
cd /usr/local
wget https://registry.npmmirror.com/-/binary/node/latest-v16.x/node-v16.13.1-linux-x64.tar.gz

tar -xvf node-v16.13.1-linux-x64.tar.gz
mv node-v16.13.1-linux-x64  node

vi /etc/profile
# 在文件最后添加以下配置：
export NODE_HOME=/usr/local/node  
export PATH=$NODE_HOME/bin:$PATH

source /etc/profile

测试： 
node -v
npm -v

安装 git：
yum install -y git  
git clone ....   [aliyun 对 git 的访问做过优化？？]
git config --global user.email "sodaoo@qq.com"
git config --global user.name "Sodaoo"
```



**安装 yarn**

```bash
wget https://github.com/yarnpkg/yarn/releases/download/v1.22.19/yarn-v1.22.19.tar.gz
tar -zxvf yarn-v1.22.19.tar.gz
mv yarn-v1.22.19 yarn

# 添加环境变量
vim /etc/profile

export YARN_HOME=/usr/local/yarn
export PATH=$PATH:$YARN_HOME/bin

source /etc/profile

yarn -v
```



### npm 权限问题

ex： 在使用 `npm install` 的时候提示 `core-js-pure postinstall ` 执行出错

```bash
core-js-pure@3.6.5 postinstall: `node -e "try{require('./postinstall')}catch(e){}"`
npm ERR! spawn ENOENT
npm ERR! 
npm ERR! Failed at the core-js-pure@3.6.5 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

解决方式:

```bash
npm i --unsafe-perm
```

原因：

> npm 出于安全考虑不支持以 root 用户运行，即使你用 root 用户身份运行了，npm 会自动转成一个叫 nobody 的用户来运行，而这个用户几乎没有任何权限。这样的话如果你脚本里有一些需要权限的操作，比如写文件（尤其是写 /root/.node-gyp），就会崩掉了。

> 为了避免这种情况，要么按照 npm 的规矩来，专门建一个用于运行 npm 的高权限用户；要么加 --unsafe-perm 参数，这样就不会切换到 nobody 上，运行时是哪个用户就是哪个用户，即使是 root。

> 权限不足报错时使用 npm 的姿势： sudo + 命令 + --unsafe-perm

emmmm....



### 前端部署

```bash
$ npm run build
# Run build 后会在 ./dist/ 文件夹下生成静态文件。

npm -g install  serve
cd ./build
serve
   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   Serving!                                      │
   │                                                 │
   │   - Local:            http://localhost:3000     │
   │   - On Your Network:  http://192.168.1.4:3000   │
   │                                                 │
   │   Copied local address to clipboard!            │
   │                                                 │
   └─────────────────────────────────────────────────┘
# 打开 http://localhost:3000  就能在 Mac 本地去验证现有的页面。
```







## 安装 **MongoDB** ：

```bash
wget wget http://downloads.mongodb.org/linux/mongodb-linux-x86_64-4.0.9.tgz

tar -xvf mongodb-linux-x86_64-4.0.9.tgz 

mv mongodb-linux-x86_64-4.0.9 mongoDB

cd /usr/local/mongoDB
mkdir data
mkdir logs 
vim mongodb.conf      # ↓ 
```



`vim mongodb.conf`

```bash
dbpath=/usr/local/mongoDB/data
logpath=/usr/local/mongoDB/logs/mongodb.log
port=27017
fork=false  # 一开始改的 true，发现不好使
journal=false
storageEngine=mmapv1
```



添加环境变量：

```bash
vim ~/.bashrc
export PATH=$PATH:/usr/local/mongoDB/bin
source ~/.bashrc

mongod --config /usr/local/mongoDB/mongodb.conf --dbpath /usr/local/mongoDB/data/db

后台（非前台）启动：
重启后千万别忘了启动数据库：


```





测试：

```bash
$ mongo
> show databases;
> use local;
> show tables
```



查看 Mongod 当前端口：

```bash
netstat -nalp | grep mongod
```









## 安装 **Nginx**

```bash
# 前期准备
yum install gcc-c++
yum -y install zlib zlib-devel openssl openssl-devel pcre pcre-devel

# 安装结束后，执行安装 Nginx 的命令：
yum install nginx -y

$ sudo systemctl enable nginx # 设置开机启动 

$ sudo service nginx start # 启动 nginx 服务 

$ sudo service nginx stop # 停止 nginx 服务 

$ sudo service nginx restart # 重启 nginx 服务 

$ sudo service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用 
```



### Nginx 配置

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-09-14-020236.png)

```bash
$ vim /etc/nginx/nginx.conf
# 如上图，在下面新增自己的代理配置：

    server {
        listen 80;
        server_name xxx.com ;
        location / {
                proxy_pass http://127.0.0.1:8080;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_redirect off;
        }
    }
```



### 项目 Nginx 配置

```bash
        server {
        listen 80;
        server_name 39.105.169.246 chem-synbio.net;
        location / {
            root /home/zhifeng/client/dist/;
            index index.html;
            try_files $uri /index.html;
        }
        location /form {
                proxy_pass http://127.0.0.1:8080;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_redirect off;
        }
    }


```



```
vim /home/zhifeng/client/src/api/http-common.jsx

cd /home/zhifeng/client/ && npm run build
```



## HTTPS

nginx配置后https 无法访问，冷静分析：

- nginx都没有返回状态吗，直接无法连接。这到底请求到了吗？



新增端口监听，域名绑定新虚拟主机等等，需要完整重启。



```
curl http://39.105.169.246
curl https://39.105.169.246
```





安全证书绑定的地址： 

```
www.chem-synbio.net
chem-synbio.net
```





### 防火墙

```
打开防火墙后，无论 80 是否开启， http://chem-synbio.net/ 都无法访问
关闭防火墙后，http://chem-synbio.net可以访问。
```



`netstat -anp` 查看防火墙开的端口 :

```
netstat -anp | grep 443
```



```bash
#这里要开放80端口，因此可以使用防火墙命令查看80端口是否开放
#如果防火墙已经关闭的话，要先开启防火墙
systemctl start firewalld

# 查看是否开放
firewall-cmd --query-port=80/tcp   

# 如果未开放则使用以下命令开放
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent


# 最后重启防火墙
firewall-cmd --reload
```









```bash
server {
    listen 443 ssl;
    #配置HTTPS的默认访问端口为443。
    #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
    #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
    server_name domain; #需要将domain替换成证书绑定的域名。
    root html;
    index index.html index.htm;
    ssl_certificate cert/cert-file-name.pem;  #需要将cert-file-name.pem替换成已上传的证书文件的名称。
    ssl_certificate_key cert/cert-file-name.key; #需要将cert-file-name.key替换成已上传的证书私钥文件的名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    location / {
        root address;  #address网站程序存放目录。
        index index.html index.htm;
    }
}
server {
    listen 80;
    server_name domain; #需要将domain替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    location / {
        index index.html index.htm;
    }
}


```



```
        ssl_certificate cert/8444101_cloud.***.com.pem;
        ssl_certificate_key cert/8444101_cloud.***.com.key;
        ssl_session_timeout  5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_prefer_server_ciphers on;
```







设置HTTP请求自动跳转HTTPS。
如果您希望所有的HTTP访问自动跳转到HTTPS页面，则可以在需要跳转的HTTP站点下添加以下rewrite语句。

```bash
server {
    listen 80;
    server_name yourdomain.com; #需要将yourdomain.com替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    location / {
        index index.html index.htm;
    }
}


或者： 


server {
    listen 80;
    server_name cloud.***.com; 
    # 把http的域名请求转成https
    return 301 https://$host$request_uri; 
```



同理，server.js 里面配置也要变：

![](https://upload-images.jianshu.io/upload_images/14245154-53858d1958c62323.png?imageMogr2/auto-orient/strip|imageView2/2/w/798)



### 浏览器显示不安全：

可以在 f12 浏览器安全中查看具体不安全的原因，于是我发现了是我的后端接口地址

问题，我用的是ip ，而不是域名

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-09-29-112445.png" style="zoom:40%;" />

- 顺着这个思路，我们就把前端指向的地址改了（修改 server.js 文件）。
  cat /usr/share/nginx/html/server.js



```rust
window.app = {
       VUE_APP_BASE_API: 'https://cloud.***.com/api',
    VUE_APP_IMAGE_URL: 'https://cloud.***.com/Data/',
    VUE_APP_LOG_URL: 'https://cloud.***.com/Log',
    VUE_APP_DOWNLOAD_URL: 'https://cloud.***.com/DownLoad/',
    VUE_APP_LOG_URL: 'https://cloud.***.com/Log/',
    Version: '(V1.0.2)'
}
```



### Error Grave

**400 The plain HTTP request was sent to HTTPS** 

然后在 http 里加入：

```
map  $scheme  $fastcgi_https { ## Detect when HTTPS is used
    default off;
    https on;
}

server里加

fastcgi_param HTTPS  $fastcgi_https;
```

 

server里加

```xml
fastcgi_param HTTPS $fastcgi_https;
```

| https://blog.csdn.net/chengtaopai5214/article/details/100991752?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-100991752-blog-113094423.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-100991752-blog-113094423.pc_relevant_aa&utm_relevant_index=1







### 前后端分离配置： 

```bash
user nginx;
worker_processes auto; #启动进程
error_log /var/log/nginx/error.log; #全局错误日志
pid /run/nginx.pid; #PID文件

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024; #单个后台worker process进程的最大并发链接数 
}
http {
    gzip on;    #开启gzip压缩
    gzip_min_length 1k;    #设置对数据启用压缩的最少字节数
    gzip_buffers    4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6;    #设置数据的压缩等级,等级为1-9，压缩比从小到大
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;    #设置需要压缩的数据格式
    gzip_vary on;

    #虚拟主机配置
    server {
        listen       80;
        server_name  39.105.169.246 chem-synbio.net;
        root /home/zhifeng/client/dist/;   # 定义服务器的默认网站根目录位置
        index index.html;  # 定义index页面
        error_page    404         /index.html; # 将404错误页面重定向到index.html可以解决history模式访问不到页面问题

        location / {
                alias /home/zhifeng/client/dist/;
                # try_files：检查文件； $uri：监测的文件路径； /index.html：文件不存在重定向的新路径 
                try_files $uri /index.html;  
                index index.html; 
        }

        location ~/form/{
            # 把 /form 路径下的请求转发给真正的后端服务器
            proxy_pass http://localhost:8080;
            proxy_send_timeout 1800;
            proxy_read_timeout 1800;
            proxy_connect_timeout 1800;
            client_max_body_size 2048m;
            proxy_http_version 1.1;  
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "Upgrade"; 
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Forwarded-Proto $scheme;
        }
        location ~/auth/{
            proxy_pass http://localhost:8080;
            proxy_send_timeout 1800;
            proxy_read_timeout 1800;
            proxy_connect_timeout 1800;
            client_max_body_size 2048m;
            proxy_http_version 1.1;  
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "Upgrade"; 
            
            # 把 host 头传过去，后端服务程序将收到 your.domain.name, 否则收到的是 127.0.0.1:8080;
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
        }
        location ~/forminfo/{
            proxy_pass http://localhost:8080;
            proxy_send_timeout 1800;
            proxy_read_timeout 1800;
            proxy_connect_timeout 1800;
            client_max_body_size 2048m;
            proxy_http_version 1.1;  
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "Upgrade"; 
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
        }
   }    
}
```





## PM2 部署

> PM2 是一个守护进程管理器，它将帮助您管理和保持您的应用程序在线

```bash
npm install pm2@latest -g
pm2 start ./src/index.js --name myproj
# > 项目启动起来后，这时候就算我们关掉终端控制，也会在服务器运行。

pm2 stop ./src/index.js  # 关闭
  - pm2 stop myproj   # stop 暂停 这里也可以是pm2 项目列表 id号
  - pm2 stop all         # stop 暂停 所有项目
pm2 list   # 查看所用已启动项目

# 重启
pm2 restart myproj

#删除全部进程
pm2 delete all

# 日志， 
pm2  monit  myproj   # 查看日志打印等
```

别人在项目中的使用: 在项目根目录下新建一个  `pm2_start.sh`  文件，每次提交后项目后，再服务器环境中执行 `sh pm2_start.sh`





## 整套重新部署流程



npm run build

```
cd /home/surveyFullstack/client && npm i &&  npm run build 

cd /home/surveyFullstack/server  &&  npm run build && pm2 start ./src/index.js --name myproj

sudo service nginx restart

cd ./dist
cp -r img ./assets
cp -r appbg ./assets
cp -r webbg ./assets
```

```bash
把 http-common 的 API 改成部署 API

git add . && git commit -m 'update' && git push origin main
sodaoo
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

ssh root@39.105.169.246
ALYZFXq!*985

cd /home/surveyFullstack && git fetch origin main:temp
git diff temp
# 合并temp分支到本地的master分支
git merge temp -m 'xx'
# 删除temp分支
git branch -d temp  


cd /home/surveyFullstack/client &&  npm run build 
cd /home/surveyFullstack/server &&  npm run build 

cd ./dist
cp -r img ./assets
cp -r appbg ./assets
cp -r webbg ./assets
```



```bash
处理 Git：
error: Your local changes to the following files would be overwritten by merge:

#If you want remove all local changes - including files that are untracked by git - from your working copy, simply stash them:

git stash push --include-untracked

#If you don't need them anymore, you now can drop that stash:
git stash drop
```





## SEO robots.txt 文件

起因：查看服务器日志发现不断有人有请求/robots.txt

查询后得知 robots.txt 文件规定了搜索引擎抓取工具可以访问您网站上的哪些网址。 此文件主要用于避免您的网站收到过多请求；

robots.txt 文件中的以下指令:

1. user-agent: [必需，每个组需含一个或多个 User-agent 条目] 该指令指定了规则适用的自动客户端（即搜索引擎抓取工具）的名称。这是每个规则组的首行内容.
2. disallow: [每条规则需含至少一个或多个 disallow 或 allow 条目] 您不希望用户代理抓取的目录或网页（相对于根网域而言）。
3. allow: [每条规则需含至少一个或多个 disallow 或 allow 条目] 上文中提到的用户代理可以抓取的目录或网页（相对于根网域而言）。
4. itemap: [可选，每个文件可含零个或多个 sitemap 条目] 相应网站的站点地图的位置。站点地图网址必须是完全限定的网址

> 参考：[robots.txt 简介](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.google.com%2Fsearch%2Fdocs%2Fadvanced%2Frobots%2Fintro%3Fhl%3Dzh-cn)

这是我的 robots.txt ：

```javascript
User-agent: *
Disallow: /admin/
Disallow: /manage/
Disallow: /ajax/
Disallow: /graphql/
Disallow: /auth/
Disallow: /api/
Disallow: /account/
Disallow: *.php
Disallow: *.asp
Disallow: *.aspx
```





我在备案过程中发现：因为域名是我个人购买的，但是备案公司主体在浙江，两个存在主体冲突，咨询客服后，客服建议我将域名转让给公司内部人员（也就是由潘倩来做备案）。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-09-14-090713.jpg" style="zoom:50%;" />

潘倩需要做的：

1. 注册一个阿里云账号，给我 “登录账号” ，我把域名(chem-synbio.net)转给她（她可以顺便做下实名认证，或者收到域名后对域名实名） 
2. 待实名完成后（会比较快），进行备案：
   1. 备案的流程也不复杂，主要就是 2 个方面
      1. 选择企业备案，上传营业执照
      2. 填写网站相关信息，比如名称等

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-09-14-091600.png" style="zoom:47%;" />





```rust
//  sources/student.move
address 0x1 {
  module student {
    struct Empty {}
    struct Student {
      id: u64,
      age: u8,
      sex: bool,
    }
    public fun newStudent(sid: u64, sage: u8, ssex: bool): Student {  //
      return Student {
        id: sid,
        age: sage,
        sex: ssex,
      }
    }
  }
}


// scripts/05-struct.move
script {
  use 0x1::student;
  use 0x1::Debug;
  fun main() {
    let stu1 = student::newStudent(10001, 24, true);
    let id = student::getId(stu1);
    Debug::print(&id);
  }
}
```



- address 0x1  是另一种（配置 address）的写法
- struct Empty {}  说明可以建一个空的 Struct ， ps：后面不需要加分号 ; 
- sid , sage, ssex 是比较推荐的标准写法;







# 记得删除：


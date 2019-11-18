# docker-node
docker node

### build  
```bash
$ docker build -t zhangfuxing/node:latest .
```  

### run  
```bash
$ docker run -d -e TZ="Asia/Shanghai" -p 3000:3000 -v c:\docker\config:/home/node/app/config -v c:\docker\logs:/home/node/app/logs --name node zhangfuxing/node:12
```  

### docker-compose  
``` bash
$ docker-compose up -d
```  

### save  
```bash
$ docker save -o c:/docker/node.tar zhangfuxing/node:latest

# OR
$ docker save --output c:/docker/node.tar zhangfuxing/node:latest

# OR
$ docker save zhangfuxing/node:latest > c:/docker/node.tar

# You can use gzip to save the image file and make the backup smaller.
$ docker save zhangfuxing/node:latest | gzip > c:/docker/node.tar.gz
$ docker save -o c:/docker/node.tar.gz zhangfuxing/node:latest | gzip
```

### load
```bash
$ docker load < c:/docker/node.tar
$ docker load < c:/docker/node.tar.gz # gzip

# OR
$ docker load --input c:/docker/node.tar 
$ docker load --input c:/docker/node.tar.gz # gzip
```
# docker-node
docker node

### build  
```bash
$ docker build -t zhangfuxing/node:latest .
```  

### run  
```bash
$ docker run -d -p 3000:3000 -v c:\docker\config:/home/node/app/config -v c:\docker\logs:/home/node/app/logs --name node zhangfuxing/node:12
```  

### docker-compose  
``` bash
$ docker-compose up -d
```  

# docker-node
docker node

### build  
```bash
$ docker build -t zhangfuxing/node:latest .
```  

### run  
```bash
$ docker run -d -e TZ="Asia/Shanghai" -p 3000:3000 -v c:/docker/config:/home/node/app/config -v c:/docker/logs:/home/node/app/logs --name node zhangfuxing/node:latest
# Enter the container
$ docker exec -it node bash
# Exit
$ exit
```  

### docker-compose  
``` bash
# run
$ docker-compose up -d
# Enter the container
$ docker-compose exec node bash
# Exit
$ exit
# Other commands
$ docker-compose up -d node                       
$ docker-compose exec node bash                   
$ docker-compose down                            
$ docker-compose ps                              
$ docker-compose stop node                         
$ docker-compose start node                        
$ docker-compose restart node                      
$ docker-compose run --no-deps --rm node npm -v  
$ docker-compose build node                             
$ docker-compose build --no-cache node             
$ docker-compose logs  node                      
$ docker-compose logs -f node                 
$ docker-compose config  -q                         
$ docker-compose events --json node             
$ docker-compose pause node                   
$ docker-compose unpause node                  
$ docker-compose rm node                      

```  

## Swarm
```bash
$ docker swarm init
# Swarm initialized: current node (dxn1zf6l61qsb1josjja83ngz) is now a manager.

# To add a worker to this swarm, run the following command:

#     docker swarm join \
#     --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
#     192.168.99.100:2377

# To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

# To retrieve the join command including the join token for worker nodes, run:
$ docker swarm join-token worker

# To view the join command and token for manager nodes, run:
$ docker swarm join-token manager

# Run swarm join-token --rotate to invalidate the old token and generate a new token. Specify whether you want to rotate the token for worker or manager nodes:
$ docker swarm join-token  --rotate worker

# Deploy a service to the swarm
$ docker service create --replicas 2 -p 3000:3000 --name node-swarm zhangfuxing/node:latest

# Inspect a service on the swarm
$ docker service inspect --pretty node-swarm
$ docker service inspect node-swarm  # JSON
$ docker service ps node-swarm       # can see other machine, docker ps can only see this machine

# Scale the service in the swarm
$ docker service scale node-swarm=5

# Delete the service running on the swarm
$ docker service rm node-swarm

# Apply rolling updates to a service
$ docker service create \
  --replicas 3 \
  --name redis \
  --publish published=8080,target=80 \  # -p 8080:80
  --update-delay 10s \
  redis:3.0.6
$ docker service update --image redis:3.0.7 redis

# Drain a node on the swarm
$ docker service create \
  -p:6379:6379 \
  --replicas 2 \
  --name redis-swarm \
  --update-delay 10s \
  redis
$ docker service ps redis-swarm # can get NODE-NAME
$ docker node ls  # can get NODE-ID
$ docker node update --availability drain <NODE-NAME> # NODE-NAME or NODE-ID
#  to return the drained node to an active state
$ docker node update --availability active docker-desktop

# You can publish a port for an existing service using the following command:
$ docker service update \
  --publish-add published=<PUBLISHED-PORT>,target=<CONTAINER-PORT> \
  <SERVICE>
# You can use docker service inspect to view the service’s published port. For instance:
$ docker service inspect --format="{{json .Endpoint.Spec.Ports}}" redis-swarm

# Publish a port for TCP only or UDP only
# TCP ONLY
  # Long syntax:
  $ docker service create --name dns-cache \
    --publish published=53,target=53 \
    dns-cache
  # Short syntax:
  $ docker service create --name dns-cache \
    -p 53:53 \
  dns-cache
# TCP AND UDP
  # Long syntax:
  $ docker service create --name dns-cache \
    --publish published=53,target=53 \
    --publish published=53,target=53,protocol=udp \
    dns-cache
  # Short syntax:
  $ docker service create --name dns-cache \
    -p 53:53 \
    -p 53:53/udp \
    dns-cache
# UDP ONLY
# Long syntax:
  $ docker service create --name dns-cache \
    --publish published=53,target=53,protocol=udp \
    dns-cache
  # Short syntax:
  $ docker service create --name dns-cache \
    -p 53:53/udp \
    dns-cache

# Bypass the routing mesh
$ docker service create --name dns-cache \
  --publish published=53,target=53,protocol=udp,mode=host \
  --mode global \
  dns-cache
```  

### save  
```bash
$ docker save -o c:/docker/node.tar zhangfuxing/node:latest

# OR
$ docker save --output c:/docker/node.tar zhangfuxing/node:latest

# OR
$ docker save zhangfuxing/node:latest > c:/docker/node.tar  # Test in windows 10 : slower and bigger

# You can use gzip to save the image file and make the backup smaller.
$ docker save zhangfuxing/node:latest | gzip > c:/docker/node.tar.gz   # Linux
$ docker save -o c:/docker/node.tar.gz zhangfuxing/node:latest | gzip  # Linux
```

### load
```bash
$ docker load < c:/docker/node.tar
$ docker load < c:/docker/node.tar.gz # gzip

# OR
$ docker load --input c:/docker/node.tar 
$ docker load --input c:/docker/node.tar.gz # gzip
```

### push
```bash
$ docker push zhangfuxing/node:latest
```
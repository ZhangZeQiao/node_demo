# 指定使用最新版本的node基础镜像
FROM node:latest
# 在容器内创建/www/node_demo目录
RUN mkdir -p /www/node_demo
# 将容器内工作目录设置为/www/node_demo
WORKDIR /www/node_demo
# 将宿主机当前目录下内容复制到镜像/www/node_demo目录下
COPY . /www/node_demo
# npm install安装应用所需的NPM包
RUN npm install
# 对外开放容器的8888端口
EXPOSE 8888
# 容器启动后执行的命令。不可被docker run提供的参数覆盖
# ENTRYPOINT ["npm", "run"]
# 在容器启动时，执行的命令，可被docker run提供的参数覆盖
# CMD ["start"]
# ENTRYPOINT ["npm", "start"]
# CMD ["npm", "start"]
# TODO: 实践出来，上面的都没用，起不来，下面直接运行就可以了（这里只是demo，实际应用到时再看）
CMD ["node", "index.js"]
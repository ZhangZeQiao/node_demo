# https://github.com/lvwxx/blog/issues/6
# 指定使用最新版本的node基础镜像
# 采用下面的，最简单的nodejs程序镜像都要900多MB
# FROM node:latest
# TODO: Alpine是一个很小的Linux发行版，只要选择Node.js的Alpine版本，就能大幅减小镜像体积
FROM node:alpine
# 在容器内创建/www/node_demo目录
RUN mkdir -p /www/node_demo
# 将容器内工作目录设置为/www/node_demo
WORKDIR /www/node_demo
# 将宿主机当前目录下内容复制到镜像/www/node_demo目录下
COPY . /www/node_demo
# npm install安装应用所需的NPM包
# RUN cd /home/app && npm install
# RUN npm install
# TODO: 只生成生产环境下的依赖包
RUN npm install --production
# 对外开放容器的8888端口
EXPOSE 8888
# 容器启动后执行的命令。不可被docker run提供的参数覆盖
# ENTRYPOINT ["npm", "run"]
# 在容器启动时，执行的命令，可被docker run提供的参数覆盖
# CMD ["start"]
# ENTRYPOINT ["npm", "start"]
# TODO: 实践出来，下面CMD ["node", "index.js"]直接运行是可以的，但这只是运行单个文件，
# CMD ["node", "index.js"]
# 只要package.json如下面这样配置了启动页，然后CMD ["npm", "start"]，作为一个项目运行起来才是正确的打开方式
# "scripts": {
#     "start": "node index.js",
#     ... ...
# }
CMD ["npm", "start"]
#### koa
豆瓣反扒机制，服务器对服务器访问豆瓣接口。

document最核心单元 collection集合 database数据库
schema(定义数据) model(schema发布生成) entity(数据实体)

src部署在nginx，后端服务是koa框架提供

src组成部分:lib前端依赖基础库基础文件，layouts布局模板文件，components公共组件，assets静态资源，views页面


ssh-keygen -t rsa -b 4096 -C "ziqian9206@aliyun.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat /root/.ssh/id_rsa.pub


pm2 deploy deply.yaml production setup
const Koa = require('koa')
const app = new Koa()
const { normal } = require('./tpl/normal')
app.use(async(ctx,next)=>{
    ctx.type = "text/html;charset=utf-8"
    ctx.body = 'Hello World';
    //ctx.body = normal
})
app.listen(4455,console.log("开启服务"))
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')
const {connect,initSchema} = require('./database/init')
const mongoose = require('mongoose')
;(async ()=>{
    await connect()
    initSchema()
    require('./tasks/movie')
})()
app.use(views(resolve(__dirname,'./views'),{
    extension:'pug'
}))
//app.use指定的方法发送到应用程序
//app.context.db = db();
//getter ，setter 和 Object.defineProperty() 
//ctx.type 和 ctx.length 委托给 response 对象，ctx.path 和 ctx.method 委托给 request。
// app.use(async ctx => {
//     ctx; // 这是 Context
//     ctx.request; // 这是 koa Request
//     ctx.response; // 这是 koa Response
//   });
//cookies.get cookies.set
//throw抛出错误
//ctx.response.body = fs.createReadStream('./demos/template.html');
//ctx.request.path可以获取用户请求的路径，
app.use(async(ctx,next)=>{
    console.log('log1')//1
    await next();
    const rt = ctx.response.get('X-Response-Time')//响应时间
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);//5
})

app.use(async(ctx,next)=>{
    const start = Date.now();
    console.log('response1')//2
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time',`${ms}ms`)
    console.log('response2')//4
})

app.use(async(ctx,next)=>{
    console.log('render')//3
    await ctx.render('index',{
        you:'wzq',
        me:'zqw'
    })
})

app.listen(4455,console.log("开启服务"))

//request
// ctx.header
// ctx.headers
// ctx.method
// ctx.method=
// ctx.url
// ctx.url=
// ctx.originalUrl
// ctx.origin
// ctx.href
// ctx.path
// ctx.path=
// ctx.query
// ctx.query=
// ctx.querystring
// ctx.querystring=
// ctx.host
// ctx.hostname
// ctx.fresh
// ctx.stale
// ctx.socket
// ctx.protocol
// ctx.secure
// ctx.ip
// ctx.ips
// ctx.subdomains
// ctx.is()
// ctx.accepts()
// ctx.acceptsEncodings()
// ctx.acceptsCharsets()
// ctx.acceptsLanguages()
// ctx.get()

//response
// ctx.body
// ctx.body=
// ctx.status
// ctx.status=
// ctx.message
// ctx.message=
// ctx.length=返回以数字返回请求的 Content-Length
// ctx.length
// ctx.type=
// ctx.type
// ctx.headerSent
// ctx.redirect()
// ctx.attachment()
// ctx.set()
// ctx.append()
// ctx.remove()
// ctx.lastModified=
// ctx.etag=
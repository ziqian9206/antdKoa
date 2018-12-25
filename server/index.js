const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {resolve} = require('path')
app.use(views(resolve(__dirname,'./views'),{
    extension:'pug'
}))

app.use(async(ctx,next)=>{
    await ctx.render('index',{
        you:'wzq',
        me:'zqw'
    })
})
app.listen(4455,console.log("开启服务"))
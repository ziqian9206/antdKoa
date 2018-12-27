const Koa = require('koa')
const app = new Koa()
const handler = async (ctx,next) => {
    try{
        await next();
    }catch(err){
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            message:err.message
        }
        ctx.app.emit('error', err, ctx);//释放error
    }
}

const main = ctx=>{
    ctx.response.status = 404
    ctx.response.body = 'page not found'
}

const error500 = ctx=>{
    ctx.throw(500)
}

app.use(handler);
app.use(main);
app.listen(3000);
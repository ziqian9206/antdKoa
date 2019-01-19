const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')


//不同形式http请求
router.get('/movies/all',async(ctx,next)=>{
    const Movie = mongoose.model('Movie')
    //时间排序
   const movies = await Movie.find({}).sort({
       'meta.createdAt':-1
   })

   ctx.body = {
       movies
   }
})


router.get('/movies/detail/:id',async(ctx,next)=>{
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    //时间排序
   const movie = await Movie.findOne({_id:id})

   ctx.body = {
       movie
   }
})
module.exports = router
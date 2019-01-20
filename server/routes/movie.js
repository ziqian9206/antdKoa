
const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const {get,post,put,controller} = require("../lib/descorator")
const {
    getAllMovies,
    getMovieDetail,
    getRelativeMovies
} = require('../service/movie')
 @controller('/api/v0/movies')
 export class movieController{
     @get('/')
     @login
     @admin(['developer'])
     @log
     async getMovies(ctx,next){
        const {type,year} = ctx.query
         const movies = await getAllMovies(type,year)
        
        ctx.body = {
            movies
        }
     }
     @get('/:id')
     async getMovieDetail(ctx,next){
        const id = ctx.params.id
        const movie = await getMovieDetail(id)
        const relativeMovies = await getRelativeMovies(movie)
         Movie.findOne({_id:id})
       ctx.body = {
           data:{
               movie,
               relativeMovies
           },success:true
       }
     }
 }

//不同形式http请求
router.get('/movies',async(ctx,next)=>{
    const Movie = mongoose.model('Movie')
    //时间排序
   const movies = await Movie.find({}).sort({
       'meta.createdAt':-1
   })
   ctx.body = {
       movies
   }
})

router.get('/movies/:id',async(ctx,next)=>{
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    //时间排序
   const movie = await Movie.findOne({_id:id})

   ctx.body = {
       movie
   }
})
module.exports = router
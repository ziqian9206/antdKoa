import { assertModuleDeclaration } from '../../../../../Library/Caches/typescript/3.2/node_modules/@types/babel-types';

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const {get,post,put,controller} = require("../lib/descorator")
const {
   checkPassword
} = require('../service/user')
 @controller('/api/v0/user')
 export class userController{
     @post('/')
     async login(ctx,next){
        const {email,password} = ctx.request.body
        const matchData = await checkPassword(email,password)
        if(!matchData.user){
            return (ctx.body={
                success:false,
                err:'用户不存在'
            })
        }
        if(matchData.match){
            return (ctx.body={
                success:true
            })
        }
        return (ctx.body = {
            success:false,
            err:'密码不正确'
        })
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
import { normalize } from 'path';
import { isArray } from 'util';
const _ =require('lodash')
const glob = require('glob')
const Router = require('koa-router')
const {resolve} = require('path')
//唯一，一旦创建不会修改
const symbolPrefix = Symbol('prefix') 
const R = require('ramda')
const isArray = c =>_.isArray(c)?c:[c]
const routerMap = new Map()
export class Route{
    constructor (app,apiPath){
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }
    init(){
        glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)

        for(let [conf,controller] of routerMap){
            const controllers = isArray(controller)
            const prefixPath = conf.target[symbolPrefix]
            if(prefixPath)prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath+conf.path
            this.router[conf,method](routerPath,...controllers)
        }

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}
const normalizePath = path => path.startsWith('/')?path:'/${path}'

const router = conf =>(target,key,descriptor) =>{
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target:target,
        ...conf
    },target[key])
}

//传path
const controller = path =>target=>(target.prototype[symbolPrefix]=path)

export const get = path => router({
    method:'get',
    path:path
})


export const post = path => router({
    method:'post',
    path:path
})

export const put = path => router({
    method:'put',
    path:path
})

export const del = path => router({
    method:'del',
    path:path
})

export const use = path => router({
    method:'use',
    path:path
})

export const all = path => router({
    method:'all',
    path:path
})
const changeToArr = R.unless(
    R.is(isArray),
    R.of
)

const convert = middleware =>(target,key,descriptor)=>{
    target[key] = R.compose(
        R.concat(
          changeToArr(middleware)
        ),
        changeToArr
      )(target[key])
      return descriptor
}

export const auth = convert(async (ctx,next)=>{
    if(!ctx.session.user){
        return (
            ctx.body = {
                success:false,
                code:401,
                err:'登录信息失效，重新登录'
            }
        )
    }
    await next()
})

export const admin =role=> convert(async (ctx,next)=>{
    const {role} = ctx.session.user
    const rule = {
        admin:[1,4,5],
        superAdmin:[1,2,3,4]
    }
    if(!role||role!=='admin'){
        return (
            ctx.body = {
                success:false,
                code:403,
                err:'无权限'
            }
        )
    }
    await next()
})


/**
 * @Required({
 *   body: ['name', 'password']
 * })
 */
export const Required = paramsObj => convert(async (ctx, next) => {
    let errs = []
  
    R.forEachObjIndexed(
      (val, key) => {
        errs = errs.concat(
          R.filter(
            name => !R.has(name, ctx.request[key])
          )(val)
        )
      }
    )(paramsObj)
  
    if (!R.isEmpty(errs)) {
      return (
        ctx.body = {
          success: false,
          errCode: 412,
          errMsg: `${R.join(', ', errs)} is required`
        }
      )
    }
    await next()
  })
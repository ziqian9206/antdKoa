const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId,Mixed} = Schema.Types.Mixed
//传入对象，描述模型需要的字段
const MovieSchema = new Schema({
    doubanId:{
        unique:true,
        type:String
    },
    category:[{
        type:ObjectId,
        ref:'Category'
    }],
    rate: Number,//平分
    title: String,//标题
    summary: String,//简介
    video: String,//
    poster: String,//海报
    cover: String,//封面

    videoKey:String,
    posterKey:String,//文件id
    coverKey:String,//
    rawTitle:String,
    movieTypes:[String],
    pubdate:Mixed,//发布时间
    year:Number,//年份
    tags:Array,//类别标签

    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        //更新时间
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})
//保存前，回调函数可以继续调用中间件，是否是新数据
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else{
        this.meta.updatedAt = Date.now()
    }
    next()
})
//发布生成model
mongoose.model('Movie ',MovieSchema)
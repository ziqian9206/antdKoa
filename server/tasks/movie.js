const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
;(async () => {
    const script = resolve(__dirname,'../crawler/trailer-list.js')
    const child = cp.fork(script,[])//生成子进程，继承emit，注册事件监听
    let invoked = false

    child.on('error',err => {
        if(invoked) return
        invoked = true

        console.log(err)
    })

    child.on('exit',code=>{
        if(invoked) return
        invoked = true

        let err =code === 0?null:new Error('exit code'+code)
        console.log(err)
    })
    child.on('message',data=>{
        let result = data.result
        result.forEach(async item =>{
            let movie = await Movie.findOne({
                doubanId:item.doibanId
            })
        })
        if(!movie){
            movie = new Movie(item)

            await movie.save()
        }
        console.log(result)
    })
})()
const { readFile } = require('fs')
const EventEmmiter = require('events')

class EE extends EventEmmiter{}
const yy = new EE()
yy.on('event',()=>{
    console.log('出大事了2')
})

setTimeout(()=>{
    console.log('0ms6')
},0)

setTimeout(()=>{
    console.log('100ms10')
},100)

setTimeout(()=>{
    console.log('200ms11')
},200)

readFile('../../package.json','utf-8',data=>{
    console.log('完成文件1读操作回调7')
})

readFile('../../README.md','utf-8',data=>{
    console.log('完成文件2读操作回调8')
})

setImmediate(()=>{
    console.log("immediate9")
})

process.nextTick(()=>{
    console.log("process.nextTick的回调1")
})

Promise.resolve()
.then(()=>{
    yy.emit('event')
    process.nextTick(()=>{
        console.log('process.nextTick第二次回调5')
    })
    console.log("promise第一次回调3")
})
.then(()=>{
    console.log("promise第二次回调4")
})
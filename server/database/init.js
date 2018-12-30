const mongoose = require('mongoose')
const db = 'mongodb://localhost/antdkoa'

mongoose.Promise = global.Promise

exports.connect = () => {
    let maxConnectTime = 0;
    return new Promise((resolve,reject)=>{
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true)
        }
    
        mongoose.connect(db)
    
        mongoose.connection.on('disconnected',()=>{
            maxConnectTime++
            if(maxConnectTime<5){
                mongoose.connect(db)
            }else{
               throw new Error('db挂了')
            }
           
        })
    
        mongoose.connection.on('error',err=>{
            reject(err)
            console.log(err)
            mongoose.connect(db)
        })
        mongoose.connection.once('open',()=>{
            const Dog = mongoose.model('dog',{name:String})
            const dog = new Dog({name:'a'})
            dog.save().then(()=>{
                console.log('wang')
            })
            resolve()
            console.log('mongodb sucessfully')
        })
    })

    

}
class Boy{
    @speak
    run(){
        console.log('I can run!')
    }
        
}
function speak(lang){
    return function (target,key,descriptor){
        console.log(target)
        target.lang = lang
        return descriptor
    }
}


const luke = new Boy()

//target:Boy类,key:run，修饰类的方法名 descriptor是否可配置可枚举可写 描述
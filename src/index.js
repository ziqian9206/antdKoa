// import './assets/common.sass'
// function changeTitle(){
//     window.$('#app').html('parcel 打包')
// }

// setTimeout(()=>{
//     changeTitle()
// },2000)
import React from 'react' 
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './app'
const rootElement = document.getElementById('app')
render(<BrowserRouter><App/></BrowserRouter>,rootElement)